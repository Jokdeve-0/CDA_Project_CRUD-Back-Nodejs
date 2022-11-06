export class ValidationError extends Error {
  constructor(message = 'Validation error.') {
    super(message);
  }
}
