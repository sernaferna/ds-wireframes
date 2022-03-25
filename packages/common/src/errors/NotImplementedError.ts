import { CustomError, StandardErrorCodes } from './CustomError';

export class NotImplementedError extends CustomError {
  statusCode = 404;
  errorCode = StandardErrorCodes.NotImplemented;

  constructor(public callingComponent: string) {
    super('API not implemented');
    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }

  serializeErrors() {
    return { errorCode: this.errorCode, errors: [{ message: 'Not implemented', field: this.callingComponent }] };
  }

  serializeInternalError(): string {
    return `${this.callingComponent} not implemented`;
  }
}
