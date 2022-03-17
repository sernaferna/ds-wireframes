import { Request, Response, NextFunction } from 'express';
import { CustomError, StandardErrorCodes } from '../errors/CustomError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    console.error(`${err.errorCode} error encountered; status ${err.statusCode}; ${err.serializeErrorsToString()}`);
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  console.error('Error received:', err.message);
  return res.status(400).send({
    errorCode: StandardErrorCodes.SomethingWentWrong,
    errors: [{ message: 'Something went wrong', field: err.message }],
  });
};
