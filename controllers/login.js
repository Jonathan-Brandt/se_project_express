const User = require("../models/user");
const { AUTHERROR } = require("../utils/errors");

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.FindUserByCredentials(email, password)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      return res.status(AUTHERROR).send({
        message:
          "Credentials do not match those in our records, please try again",
      });
    });
};
