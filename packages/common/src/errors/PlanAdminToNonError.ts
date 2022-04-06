import { CustomError, StandardErrorCodes } from './CustomError';

export class PlanAdminToNonError extends CustomError {
  statusCode = 400;
  errorCode = StandardErrorCodes.PlanAdminToNon;

  constructor(public planName: string) {
    super('Attempted to turn admin plan into non-admin plan');
    Object.setPrototypeOf(this, PlanAdminToNonError.prototype);
  }

  serializeErrors() {
    return {
      errorCode: this.errorCode,
      errors: [
        {
          message: `Attempted to turn ${this.planName} from Admin to non-Admin`,
        },
      ],
    };
  }

  serializeInternalError() {
    return `Attempted to turn ${this.planName} from Admin to non-Admin`;
  }
}
