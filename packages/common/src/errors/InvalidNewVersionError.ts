import { CustomError, StandardErrorCodes } from './CustomError';

export class InvalidNewVersionError extends CustomError {
  statusCode = 400;
  errorCode = StandardErrorCodes.InvalidNewVersion;

  constructor(public oldVersion: string, public newVersion: string) {
    super('New version number must be greater than old version number');

    Object.setPrototypeOf(this, InvalidNewVersionError.prototype);
  }

  serializeErrors() {
    return {
      errorCode: this.errorCode,
      errors: [
        {
          message: `New version number (${this.newVersion} must be greater than old version number (${this.oldVersion}).`,
        },
      ],
    };
  }

  serializeInternalError(): string {
    return `New version number (${this.newVersion} must be greater than old version number (${this.oldVersion}).`;
  }
}
