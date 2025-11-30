const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { AuthorizationError } = require("../errors/authError");

const handleAuthError = () => {
  AuthorizationError("Authorization Error");
};

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};

module.exports = { authMiddleware };
