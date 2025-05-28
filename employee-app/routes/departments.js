const express = require("express");
const router = express.Router();
const Department = require("../models/departments");
const Employee = require("../models/employees");

//Will create a new department
router.post("/newDep", async (req, res) => {
  try {
    const { name } = req.body;
    //checks to make sure its not a empty string
    if (!name || name.trim() === "") {
      res.status(400).json({ message: "Department name is required" });
    }
    const newDepartment = new Department({ name: name.trim() });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: "Department already exists" });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
});

//Will show all possible departments at the time
router.get("/allDep", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get employees in a specific department by department name
router.get("/getDep/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const department = await Department.findOne({ name });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    //finds all employees with that department ID
    const employees = await Employee.find({ department: department._id });

    if (employees.length === 0) {
      return res.status(404).json({ message: "Department has no employees" });
    }

    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Delete Department
router.delete("/deleteDep/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const deleted = await Department.findOneAndDelete({ name });
    if (!deleted)
      return res.status(404).json({ message: "Department Not found" });
    res.json({ message: "Department deleted", department: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
