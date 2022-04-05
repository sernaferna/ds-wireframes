import { CustomError, StandardErrorCodes } from './CustomError';

export class InvalidDayForPlanError extends CustomError {
  statusCode = 400;
  errorCode = StandardErrorCodes.InvalidDayForPlan;

  constructor() {
    super('Invalid day for plan');
    Object.setPrototypeOf(this, InvalidDayForPlanError.prototype);
  }

  serializeErrors() {
    return { errorCode: this.errorCode, errors: [{ message: 'Invalid day data passed for plan' }] };
  }

  serializeInternalError() {
    return 'Invalid day data passed for plan';
  }
}
