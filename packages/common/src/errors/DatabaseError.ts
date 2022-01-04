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
}
