import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/RequestValidationError';

/**
 * Checks whether any validation errors were encountered on
 * this request, and throws an appropriate error if so.
 *
 * Typically used in conjunction with `express-validator`, where
 * validatator checks the request (and supplies errors on the
 * Request object), and this middleware then takes care of
 * throwing the appropriate exception to cease processing.
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Express `nexxt` function
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
