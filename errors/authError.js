const { AUTHERROR } = require("../utils/errors");

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTHERROR;
  }
}

module.exports = { AuthorizationError };
