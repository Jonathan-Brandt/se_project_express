const { JWT_SECRET } = require("../utils/config");
const { AUTHERROR } = require("../utils/errors");

const authMiddleware = (req, res, next) => {
  const token = authorization.replace("Bearer", "");
  payload = jwt.verify(token, JWT_SECRET);
  req.user = payload;
  token
    .find({})
    .then((userToken) => res.status(200).send(userToken))
    .catch((err) => {
      console.error(err);
      return res
        .status(AUTHERROR)
        .send({ message: "Authentication error, please try again" });
    });
  next();
};

module.exports = { authMiddleware };
