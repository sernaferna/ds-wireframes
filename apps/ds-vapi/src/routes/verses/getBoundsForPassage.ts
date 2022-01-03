import express, { Request, Response } from 'express';
import { getVerseByOSIS } from '../../services/db';
import { Verse, validateRequest } from '@devouringscripture/common';
import { check } from 'express-validator';

export interface Bounds {
  lowerBound: number;
  upperBound: number;
}

export const getBoundsForPassage = (osis: string): Promise<Bounds> => {
  return new Promise<Bounds>((resolve, reject) => {
    const bounds: Bounds = { lowerBound: 0, upperBound: 0 };

    const passageList: string[] = osis.split('-');

    getVerseByOSIS(passageList[0])
      .then((value: Verse) => {
        bounds.lowerBound = value.versenum;
        getVerseByOSIS(passageList[passageList.length - 1])
          .then((value: Verse) => {
            bounds.upperBound = value.versenum;
            resolve(bounds);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const router = express.Router();

router.post(
  '/boundsForPassage',
  [check('osis').exists().withMessage('OSIS string required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`Get bounds for passage called with ${req.body.osis}`);

    getBoundsForPassage(req.body.osis)
      .then((bounds) => {
        res.send(bounds);
      })
      .catch((err) => {
        res.status(500).send('Error encountered');
      });
  }
);

export { router as getBoundsForPassageRouter };