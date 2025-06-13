const mongoose = require("mongoose");
const { Schema } = mongoose;

//for admins only
const userSchema = new Schema(
  {
    //to display in home page
    userName: {
      type: String,
      required: true,
    },
    //regex explanation using the example: example@gmail.com
    // 1. ^\w+ - represents the beginning of the email containing 1 or more characters representing the 'example' portion
    // 2. ([.-]?\w+)* - Matches optional .example or -example, like in john.doe.
    //       - * means zero or more repetitions.
    // 3. @ - the critical and needed character for the email representing @ literally
    // 4. \w+([.-]?\w+)* - holds the name before the domain representing gmail
    // 5. (\.\w{2,3})+ - holds the domain name representing .com or even .net
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
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
