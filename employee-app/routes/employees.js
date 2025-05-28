const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");

// Create new employee
router.post("/newEmp", async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName, lastName, department });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Employee
router.delete("/deleteEmp/:id", async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Employee deleted", employee: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Employee Information
router.patch("/updateEmp", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
