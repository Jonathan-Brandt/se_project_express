const { FORBIDDEN } = require("../utils/errors");

class forbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = { forbiddenError };
