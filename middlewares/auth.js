const { JWT_SECRET } = require("../utils/config");
const { AUTHERROR } = require("../utils/errors");
const jwt = require("jsonwebtoken");

const handleAuthError = (res) => {
  return res.status(AUTHERROR).send({ message: "Authorization Error" });
};

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = authorization.replace("Bearer ", "");
  const payload = jwt.verify(token, JWT_SECRET);

  try {
    payload;
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};

module.exports = { authMiddleware };
