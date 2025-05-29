const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");
const Department = require("../models/departments");

// Create new employee
router.post("/newEmp", async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    if (!firstName || !lastName || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const findDepartment = await Department.findOne({ name: department });
    if (!findDepartment) {
      res.status(400).json({ message: "Department name does not exist" });
    }

    const newEmployee = new Employee({
      firstName,
      lastName,
      department: findDepartment._id,
    });
    await newEmployee.save();
    res.status(201).json({
      message: "Employee created successfully",
      employee: {
        id: newEmployee._id,
        firstName: newEmployee.firstName,
        lastName: newEmployee.lastName,
        department: findDepartment.name,
        createdAt: newEmployee.createdAt,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Get all Employees
router.get("/allEmp", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Search for specific Employee
router.get("/getEmp/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const employees = await Employee.find({
      $or: [{ firstName: name }, { lastName: name }],
    });

    if (employees.length === 0) {
      return res.status(400).json({ message: "Employee does not exist" });
    }
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Employee
router.delete("/deleteEmp/:firstName/:lastName", async (req, res) => {
  try {
    const { firstName, lastName } = req.params;
    const deleted = await Employee.findOneAndDelete({ firstName, lastName });
    if (!deleted)
      return res.status(404).json({ message: "Employee does not exist" });
    res.json({ message: "Employee deleted", employee: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Employee Department
router.patch("/updateEmp/:firstName/:lastName/:newDep", async (req, res) => {
  try {
    const { firstName, lastName, newDep } = req.params;

    //Check if the department exists
    const department = await Department.findOne({ name: newDep });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    //Update the employee's department
    const updatedEmployee = await Employee.findOneAndUpdate(
      { firstName, lastName },
      { department: department._id },
      { new: true } //option returns the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee department updated",
      employee: updatedEmployee,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
