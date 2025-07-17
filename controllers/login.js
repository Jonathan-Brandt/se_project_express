const User = require("../models/user");
const { AUTHERROR } = require("../utils/errors");

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      return res.status(AUTHERROR).send({
        message:
          "The credentials do not match those in our records, please try again",
      });
    });
};

module.exports = { login };
