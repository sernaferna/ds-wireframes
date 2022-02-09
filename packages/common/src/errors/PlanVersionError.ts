import { CustomError } from './CustomError';

export class PlanVersionError extends CustomError {
  statusCode = 400;

  constructor(public oldVersion: string, public newVersion: string) {
    super('Invalid version number for plan');

    Object.setPrototypeOf(this, PlanVersionError.prototype);
  }

  serializeErrors() {
    return [
      { message: `Invalid version number for plan; old version: ${this.oldVersion}; new version: ${this.newVersion}` },
    ];
  }
}
