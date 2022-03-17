import { CustomError, StandardErrorCodes } from './CustomError';

export class InvalidPlanError extends CustomError {
  statusCode = 400;
  errorCode = StandardErrorCodes.InvalidPlan;

  constructor(public planDetails: string) {
    super('Invalid plan');
    Object.setPrototypeOf(this, InvalidPlanError.prototype);
  }

  serializeErrors() {
    return { errorCode: this.errorCode, errors: [{ message: this.message, field: this.planDetails }] };
  }

  serializeInternalError() {
    return `Invalid plan: ${this.planDetails}`;
  }
}
