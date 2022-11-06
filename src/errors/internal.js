export class InternalError extends Error {
  constructor(message = 'Internal error.') {
    super(message);
  }
}
