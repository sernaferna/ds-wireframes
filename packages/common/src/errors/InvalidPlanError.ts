import { CustomError } from './CustomError';

export class InvalidPlanError extends CustomError {
  statusCode = 400;

  constructor(public planDetails: string) {
    super('Invalid plan');
    Object.setPrototypeOf(this, InvalidPlanError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, field: this.planDetails }];
  }

  serializeErrorsToString() {
    return `Invalid plan: ${this.planDetails}`;
  }
}
