const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { AuthorizationError } = require("../errors/authError");

const handleAuthError = () => {
  return next(new AuthorizationError("Authorization Error"));
};

const authMiddleware = (req, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new AuthorizationError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthorizationError("Authorization required"));
  }

  req.user = payload;

  return next();
};

module.exports = { authMiddleware };
