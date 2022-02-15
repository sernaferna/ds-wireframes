import { CustomError } from './CustomError';
import { ValidationError } from 'express-validator';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Validation errors');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }

  serializeErrorsToString(): string {
    let message: string = 'Validation errors encountered:';

    for (const err of this.errors) {
      message += err.msg + ' / ' + err.param;
    }

    return message;
  }
}
