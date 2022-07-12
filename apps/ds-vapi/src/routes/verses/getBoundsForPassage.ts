import express, { Request, Response, NextFunction } from 'express';
import { getVerseByOSIS } from '../../services/db';
import {
  validateRequest,
  DatabaseError,
  CustomError,
  InvalidPassageError,
  OSISRange,
  getRangesForOSIS,
} from '@devouringscripture/common';
import { check } from 'express-validator';

export interface Bounds {
  lowerBound: number;
  upperBound: number;
}

export const getBoundsForPassage = async (osis: string): Promise<Bounds[]> => {
  return new Promise<Bounds[]>(async (resolve, reject) => {
    const returnValue: Bounds[] = [];
    const initialValues: OSISRange[] = getRangesForOSIS(osis);

    try {
      for (const range of initialValues) {
        await Promise.all([getVerseByOSIS(range.startOsisString), getVerseByOSIS(range.endOsisString)]).then(
          (result) => {
            const newBound: Bounds = { lowerBound: result[0].versenum, upperBound: result[1].versenum };
            returnValue.push(newBound);
          }
        );
      }

      return resolve(returnValue);
    } catch (err) {
      return reject(err);
    }
  });
};

const router = express.Router();

router.post(
  '/boundsForPassage',
  [check('osis').exists().withMessage('OSIS string required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const passageArray: OSISRange[] = getRangesForOSIS(req.body.osis);
      if (passageArray.length < 1) {
        throw new InvalidPassageError(req.body.osis);
      }

      const bounds: Bounds[] = await getBoundsForPassage(req.body.osis);
      return res.json(bounds);
    } catch (err) {
      return next(err instanceof CustomError ? err : new DatabaseError('getBoundsForPassage'));
    }
  }
);

export { router as getBoundsForPassageRouter };
