import { Request, Response, NextFunction } from 'express';
import { CustomError, StandardErrorCodes } from '../errors/CustomError';
import { writeLog } from '../middlewares/Logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    writeLog(err.serializeErrorsToString(), undefined, undefined, 'ERROR');
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  writeLog(`Error received: ${err.message}`, undefined, undefined, 'ERROR');
  return res.status(400).send({
    errorCode: StandardErrorCodes.SomethingWentWrong,
    errors: [{ message: 'Something went wrong', field: err.message }],
  });
};
