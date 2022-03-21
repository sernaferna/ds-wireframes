import { CustomError, ErrorResponse, StandardErrorCodes } from './CustomError';
import { PlanDay } from '../dm/Plan';
import { isReferenceValid } from '../helpers/refparse/index';

export class InvalidPlanDaysError extends CustomError {
  statusCode = 400;
  errorCode = StandardErrorCodes.InvalidPlanDays;

  constructor(public days: PlanDay[] = []) {
    super('Invalid list of days for plan');
    Object.setPrototypeOf(this, InvalidPlanDaysError.prototype);
  }

  serializeErrors(): ErrorResponse {
    const response: ErrorResponse = {
      errorCode: this.errorCode,
      errors: this.days
        .map((day, index) => ({
          invalid: !isReferenceValid(day.osis),
          dayNum: index + 1,
          osis: day.osis,
        }))
        .filter((day) => day.invalid)
        .map((day) => {
          return {
            message: `Day ${day.dayNum} reference not valid`,
            field: day.osis,
          };
        }),
    };

    return response;
  }

  serializeInternalError() {
    let responseString = 'Invalid references in some days for the plan. ';

    for (const day of this.days) {
      if (!isReferenceValid(day.osis)) {
        responseString += 'OSIS: ' + day.osis + '; ';
      }
    }

    return responseString;
  }
}
