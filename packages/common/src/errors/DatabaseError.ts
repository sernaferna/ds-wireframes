import { CustomError, StandardErrorCodes } from './CustomError';

export class DatabaseError extends CustomError {
  statusCode = 500;
  errorCode = StandardErrorCodes.DatabaseProblem;
  private msg: string;

  constructor(public callingComponent: string, public details?: string) {
    super('Database error');

    let theMsg: string = `Database error from component ${callingComponent}`;
    if (details) {
      theMsg += '; ' + details;
    }
    this.msg = theMsg;
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return { errorCode: this.errorCode, errors: [{ message: this.msg }] };
  }

  serializeInternalError(): string {
    return `Database error; ${this.msg}`;
  }
}
