import { Request, Response, NextFunction } from 'express';
import { CustomError, StandardErrorCodes } from '../errors/CustomError';
import { writeLog } from '../middlewares/Logger';

/**
 * Express middleware to consistently handle errors, by:
 *
 * * Logging them consistently (via the `writeLog` helper)
 * * Returning a consistent JSON error object
 *
 * @param err The raw error being handled
 * @param req The HTTP Request object
 * @param res The HTTP Response object
 * @param next The express `next` function
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    writeLog(err.serializeErrorsToString(), undefined, undefined, 'ERROR');
    return res.status(err.statusCode).json(err.serializeErrors());
  }

  writeLog(`Error received: ${err.message}`, undefined, undefined, 'ERROR');
  return res.status(400).json({
    errorCode: StandardErrorCodes.SomethingWentWrong,
    errors: [{ message: 'Something went wrong', field: err.message }],
  });
};
