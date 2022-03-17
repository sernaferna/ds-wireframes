export enum StandardErrorCodes {
  DatabaseProblem = 1,
  InvalidNewVersion,
  InvalidPassage,
  InvalidPlan,
  InvalidPlanStatus,
  NotFound,
  NotImplemented,
  InvalidPlanVersion,
  InvalidData,
  UserNotFound,
  SomethingWentWrong,
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract errorCode: StandardErrorCodes;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { errorCode: StandardErrorCodes; errors: { message: string; field?: string }[] };

  serializeErrorsToString(): string {
    return `Error code ${this.errorCode}. ` + this.serializeInternalError();
  }

  abstract serializeInternalError(): string;
}
