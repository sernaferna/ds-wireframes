import { CustomError } from './CustomError';

export class InvalidNewVersionError extends CustomError {
  statusCode = 400;

  constructor(public oldVersion: string, public newVersion: string) {
    super('New version number must be greater than old version number');

    Object.setPrototypeOf(this, InvalidNewVersionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: `New version number (${this.newVersion} must be greater than old version number (${this.oldVersion}).`,
      },
    ];
  }
}
