import { CustomError } from './CustomError';

export class InvalidPassageError extends CustomError {
  statusCode = 400;

  constructor(public passage: string) {
    super('Invalid Bible passage');
    Object.setPrototypeOf(this, InvalidPassageError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, field: this.passage }];
  }

  serializeErrorsToString(): string {
    return `'${this.passage}' is an invalid passage`;
  }
}
