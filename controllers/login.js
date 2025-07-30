const User = require("../models/user");
const { AUTHERROR } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(AUTHERROR)
      .send({ message: "Please enter email and password" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "invalid emal or password") {
        return res.status(AUTHERROR).send({
          message:
            "The credentials do not match those in our records, please try again",
        });
      }
    });
};

module.exports = { login };
