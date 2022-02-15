import { CustomError } from './CustomError';

export class DatabaseError extends CustomError {
  statusCode = 500;

  constructor(public callingComponent: string) {
    super('Database error');
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Database error', field: this.callingComponent }];
  }

  serializeErrorsToString(): string {
    return `Database error; calling component: ${this.callingComponent}`;
  }
}
