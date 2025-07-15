const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  avatar: {
    type: String,
    required: [true, "The avatar field is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Please enter a valid URL address",
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, "The email field is required"],
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Please enter a valid email address",
    },
  },

  password: {
    type: String,
    required: [true, "The password field is required"],
  },
});

module.exports = mongoose.model("user", userSchema);
