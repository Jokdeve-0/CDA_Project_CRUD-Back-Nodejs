const  config = require('../src/_config/config');
const  UnauthorizedError = require('../src/errors/unauthorized');

module.exports = (request, response, next) => {
  if (request.method !== 'GET') {
    const { csrf } = request?.cookies;
    const csrfHeader = request.headers[config.csrfHeader];
    if (!csrf || !csrfHeader || csrf !== csrfHeader) {
      throw new UnauthorizedError();
    }
  }
  next();
}
