import HttpException from '../common/http-exception';
import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
  const message = 'Resource not found';

  response.status(404).send(message);
};
