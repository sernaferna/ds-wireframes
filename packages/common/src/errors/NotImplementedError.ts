import { CustomError } from './CustomError';

export class NotImplementedError extends CustomError {
  statusCode = 404;

  constructor(public callingComponent: string) {
    super('API not implemented');
    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not implemented', field: this.callingComponent }];
  }

  serializeErrorsToString(): string {
    return `${this.callingComponent} not implemented`;
  }
}
