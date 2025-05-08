const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");

// Create new employee
router.post("/newEmployee", async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName, lastName, department });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all employees with department info
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().populate("department");
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
