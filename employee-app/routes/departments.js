const express = require("express");
const router = express.Router();
const Department = require("../models/departments");

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

//Delete Department
router.delete("/deleteDep/:id", async (req, res) => {
  try {
    const deleted = await Department.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Department deleted", employee: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
