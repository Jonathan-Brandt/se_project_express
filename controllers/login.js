const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { AUTHERROR, BAD_REQUEST, DEFAULT } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
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
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { login };
