import { CustomError, StandardErrorCodes } from './CustomError';

export class NotFoundError extends CustomError {
  statusCode = 404;
  errorCode = StandardErrorCodes.NotFound;

  constructor(public resource: string) {
    super('404 Error');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return { errorCode: this.errorCode, errors: [{ message: 'Resource not found', field: this.resource }] };
  }

  serializeInternalError(): string {
    return `Resource not found: ${this.resource}`;
  }
}
