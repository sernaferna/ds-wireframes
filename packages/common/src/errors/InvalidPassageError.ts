import { CustomError, StandardErrorCodes } from './CustomError';

export class InvalidPassageError extends CustomError {
  statusCode = 400;
  errorCode = StandardErrorCodes.InvalidPassage;

  constructor(public passage: string) {
    super('Invalid Bible passage');
    Object.setPrototypeOf(this, InvalidPassageError.prototype);
  }

  serializeErrors() {
    return {
      errorCode: this.errorCode,
      errors: [{ message: this.message, field: this.passage }],
    };
  }

  serializeInternalError(): string {
    return `'${this.passage}' is an invalid passage`;
  }
}
