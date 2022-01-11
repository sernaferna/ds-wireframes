import { CustomError } from '..';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public resource: string) {
    super('404 Error');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Resource not found', field: this.resource }];
  }
}
