const express = require("express");
const router = express.Router();
const User = require("../models/user");
//to allow hashing of passwords
const bcrypt = require("bcrypt");

//Works properly
router.post("/user", async (req, res) => {
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

    if (existUser) {
      // If the user exists, verify the password
      const isMatch = await bcrypt.compare(password, existUser.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      // If password matches, we don’t want to create a new user, just respond
      return res.status(200).json({
        message: "User already exists and authenticated successfully",
        user: existUser,
      });
    }

    //Hashes the password before saving the new user
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    //Saves the creation of a new user
    const newUser = new User({ userName, password: hashedPass });
    await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
