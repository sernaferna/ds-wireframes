import { CustomError } from './CustomError';

export class DatabaseError extends CustomError {
  statusCode = 500;
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
    return [{ message: this.msg }];
  }

  serializeErrorsToString(): string {
    return this.msg;
  }
}
