class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized.') {
    super(message);
  }
}
module.exports = UnauthorizedError;
