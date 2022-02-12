import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    console.error(`${err.message} error encountered; status ${err.statusCode}; ${err.serializeErrors()}`);
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);
  return res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};
