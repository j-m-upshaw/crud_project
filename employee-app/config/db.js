//connects to our database
const mongoose = require("mongoose");

//will contain the link to the database in use
const url = "mongodb://mongo:27017/docker-node-mongo";

const connectDb = () => {
  mongoose.connect(url, () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = connectDb;
