import lodash from 'lodash';

export class NotFoundError extends Error {
  constructor(message = 'Resource not found.') {
    if (typeof message === 'object') {
      message = `${lodash.capitalize(message.modelName)} not found with id \`${message.id}\`.`;
    }

    super(message);
  }
}
