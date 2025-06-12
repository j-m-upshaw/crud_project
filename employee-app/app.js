const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDb = require("./config/db");
const employeeRoutes = require("./routes/employees.js");
const departmentRoutes = require("./routes/departments.js");
const userRoutes = require("./routes/user.js");

const app = express();

connectDb();
const port = process.env.NODE_LOCAL_PORT || 3020;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/employee", employeeRoutes);
app.use("/department", departmentRoutes);
app.use("/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
