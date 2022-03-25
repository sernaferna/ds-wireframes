import { CustomError, StandardErrorCodes } from './CustomError';
import { PlanStatus } from '../dm/Plan';

export class InvalidPlanStatusError extends CustomError {
  statusCode = 400;
  errorCode = StandardErrorCodes.InvalidPlanStatus;

  constructor(public oldStatus: PlanStatus, public newStatus: PlanStatus) {
    super(`Invalid status movement from ${oldStatus} to ${newStatus}`);
    Object.setPrototypeOf(this, InvalidPlanStatusError.prototype);
  }

  serializeErrors() {
    return {
      errorCode: this.errorCode,
      errors: [{ message: `Invalid status movement from ${this.oldStatus} to ${this.newStatus}` }],
    };
  }

  serializeInternalError() {
    return `Invalid status movement from ${this.oldStatus} to ${this.newStatus}`;
  }
}
