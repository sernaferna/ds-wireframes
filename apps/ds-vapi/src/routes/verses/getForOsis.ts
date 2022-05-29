import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  InvalidPassageError,
  CustomError,
  DatabaseError,
  Verse,
  isReferenceValid,
} from '@devouringscripture/common';
import { getBoundsForPassage, Bounds } from './getBoundsForPassage';
import { getVersesByNum } from '../../services/db';

const router = express.Router();

router.post(
  '/versesForOSIS',
  [body('osis').notEmpty().withMessage('OSIS required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const osis: string = req.body.osis;
    let response: Verse[] = [];

    try {
      if (!isReferenceValid(osis)) {
        throw new InvalidPassageError(osis);
      }

      const passages: Bounds[] = await getBoundsForPassage(osis);
      for (const bound of passages) {
        const verses: Verse[] = await getVersesByNum(bound.lowerBound, bound.upperBound);
        response = response.concat(verses);
      }

      res.send(response);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const dbErr = new DatabaseError('get verses for OSIS');
      return next(dbErr);
    }
  }
);

export { router as getVersesForOsisRouter };
