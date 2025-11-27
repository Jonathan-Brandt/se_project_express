const { AUTHERROR } = require("../utils/errors");

class authorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTHERROR;
  }
}

module.exports = { authorizationError };
