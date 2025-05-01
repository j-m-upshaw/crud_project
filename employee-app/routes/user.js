const express = require("express");
const router = express.Router();
const User = require("../models/user");
//to allow hashing of passwords
const bcrypt = require("bcrypt");

router.post("/post", async (req, res) => {
  try {
    const { userName, password } = req.body;

    //Shortcut for Admins
    if (userName === "admin" && password === "admin") {
      return res.status(200).json("Welcome to the admin page");
    }

    //Checking for any missing input
    if (!(userName && password)) {
      return res.status(200).json("Please enter your username and password");
    }

    //Prevents duplicate users from being created and more secure
    const existUser = await User.findOne({ userName });
    if (!existUser) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // const checkUser = await User.findOne({ userName, password });
    if (isMatch) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    //Hashes the password before saving the new user
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    //Saves the creation of a new user
    const user = new User({ userName, password: hashedPass });
    await user.save();
    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
