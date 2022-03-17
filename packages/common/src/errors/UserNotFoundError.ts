import { CustomError, StandardErrorCodes } from './CustomError';

export class UserNotFoundError extends CustomError {
  statusCode = 404;
  errorCode = StandardErrorCodes.UserNotFound;

  constructor(public userId: string) {
    super('User not found');
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }

  serializeErrors() {
    return { errorCode: this.errorCode, errors: [{ message: 'User not found', field: this.userId }] };
  }

  serializeInternalError(): string {
    return `User ${this.userId} not found`;
  }
}
