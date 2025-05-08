const mongoose = require("mongoose");
const { Schema } = mongoose;

//for admins only
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  //automatically adds when the user was created and when it was updated
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
