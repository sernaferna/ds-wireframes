import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotImplementedError } from '@devouringscripture/common';

const router = express.Router();

router.post('/', [body('')], validateRequest, async (req: Request, res: Response, next: NextFunction) => {
  return next(new NotImplementedError('newPlan'));
});

export { router as newReadingPlan };
