const mongoose = require("mongoose");
const validator = require("validator");
const { token } = require("../utils/config");

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

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Incorrect email or password"));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      res.send({
        token,
      });
    });
  });
};

module.exports = mongoose.model("user", userSchema);
