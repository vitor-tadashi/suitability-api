module.exports = function ValidationError(errorMessage) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = errorMessage.message;
  this.details = errorMessage.details;
  this.code = errorMessage.code;
  this.title = 'Bad Request';
};

require('util').inherits(module.exports, Error);
