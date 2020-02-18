class TooManyRequestsError extends Error {
  constructor(message = TooManyRequestsError.message) {
    super(message);
    this.statusCode = TooManyRequestsError.statusCode;
  }
}

TooManyRequestsError.statusCode = 429;
TooManyRequestsError.message = 'Too Many Requests';

module.exports = TooManyRequestsError;
