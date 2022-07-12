import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { CustomError, DatabaseError, validateRequest } from '@devouringscripture/common';
import { getVersesByNum } from '../../services/db';

const router = express.Router();

router.get(
  '/from/:lowerBound/to/:upperBound',
  [
    param('lowerBound').isInt({ min: 1, max: 40000 }).withMessage('Lower bound must be numeric'),
    param('upperBound').isInt({ min: 1, max: 40000 }).withMessage('Upper bound must be numeric'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const lowerBound: number = parseInt(req.params.lowerBound as string, 10);
    const upperBound: number = parseInt(req.params.upperBound as string, 10);

    try {
      getVersesByNum(lowerBound, upperBound)
        .then((result) => res.json(result))
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      return next(err instanceof CustomError ? err : new DatabaseError('getRange'));
    }
  }
);

export { router as getRangeOfVersesRouter };
