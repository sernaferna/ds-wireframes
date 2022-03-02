import { CustomError } from './CustomError';
import { PlanStatus } from '../dm/Plan';

export class InvalidPlanStatusError extends CustomError {
  statusCode = 400;

  constructor(public oldStatus: PlanStatus, public newStatus: PlanStatus) {
    super(`Invalid status movement from ${oldStatus} to ${newStatus}`);
    Object.setPrototypeOf(this, InvalidPlanStatusError.prototype);
  }

  serializeErrors() {
    return [{ message: `Invalid status movement from ${this.oldStatus} to ${this.newStatus}` }];
  }

  serializeErrorsToString() {
    return `Invalid status movement from ${this.oldStatus} to ${this.newStatus}`;
  }
}
