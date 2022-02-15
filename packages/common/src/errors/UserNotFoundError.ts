import { CustomError } from './CustomError';

export class UserNotFoundError extends CustomError {
  statusCode = 404;

  constructor(public userId: string) {
    super('User not found');
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'User not found', field: this.userId }];
  }

  serializeErrorsToString(): string {
    return `User ${this.userId} not found`;
  }
}
