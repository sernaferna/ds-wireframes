import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('in custom error handler');

  if (err instanceof CustomError) {
    console.error('instanceof custom error');
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);
  return res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};
