//connects to our database
const mongoose = require("mongoose");

//will contain the link to the database in use
const url = "mongodb://mongo:27017/docker-node-mongo";

//depreceated and was replaced with the newer version
// const connectDb = () => {
//   mongoose.connect(url, () => {
//     console.log("Connected to MongoDB");
//   });
// };

const connectDb = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
