const { NOT_FOUND } = require("../utils/errors");

class notFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = { notFoundError };
