const { DEFAULT } = require("../utils/errors");

class defaultError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DEFAULT;
  }
}

module.exports = { defaultError };
