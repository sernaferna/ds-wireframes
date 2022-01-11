import express, { Request, Response, NextFunction } from 'express';
import { getVerseByOSIS } from '../../services/db';
import { Verse, validateRequest, DatabaseError, CustomError, InvalidPassageError } from '@devouringscripture/common';
import { PassageBounds, getPassagesForOSIS } from '@devouringscripture/refparse';
import { check } from 'express-validator';

export interface Bounds {
  lowerBound: number;
  upperBound: number;
}

export const getBoundsForPassage = async (osis: string): Promise<Bounds[]> => {
  return new Promise<Bounds[]>(async (resolve, reject) => {
    const returnValue: Bounds[] = [];
    const initialValues: PassageBounds[] = getPassagesForOSIS(osis);

    try {
      for (let i = 0; i < initialValues.length; i++) {
        const lowerVerse = await getVerseByOSIS(initialValues[i].startOsisString);
        const upperVerse = await getVerseByOSIS(initialValues[i].endOsisString);

        const newBound: Bounds = { lowerBound: lowerVerse.versenum, upperBound: upperVerse.versenum };
        returnValue.push(newBound);
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
    console.log(`Get bounds for passage called with ${req.body.osis}`);

    try {
      const passageArray: PassageBounds[] = getPassagesForOSIS(req.body.osis);
      if (passageArray.length < 1) {
        throw new InvalidPassageError(req.body.osis);
      }

      getBoundsForPassage(req.body.osis)
        .then((bounds) => {
          return res.send(bounds);
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      return next(err instanceof CustomError ? err : new DatabaseError('getBoundsForPassage'));
    }
  }
);

export { router as getBoundsForPassageRouter };
