const { CONFLICT } = require("../utils/errors");

class conflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = { conflictError };
