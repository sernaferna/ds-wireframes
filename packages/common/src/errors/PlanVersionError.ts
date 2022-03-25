import { CustomError, StandardErrorCodes } from './CustomError';

export class PlanVersionError extends CustomError {
  statusCode = 400;
  errorCode = StandardErrorCodes.InvalidPlanVersion;

  constructor(public versionNumber: string) {
    super('Invalid version number for plan');

    Object.setPrototypeOf(this, PlanVersionError.prototype);
  }

  serializeErrors() {
    return {
      errorCode: this.errorCode,
      errors: [{ message: `Invalid version number for plan: ${this.versionNumber}` }],
    };
  }

  serializeInternalError(): string {
    return `${this.versionNumber} is an invalid version number`;
  }
}
