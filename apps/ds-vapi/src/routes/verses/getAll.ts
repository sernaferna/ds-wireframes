import { CustomError, DatabaseError } from '@devouringscripture/common';
import express, { Request, Response, NextFunction } from 'express';
import { getVersesByNum } from '../../services/db';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    getVersesByNum()
      .then((verses) => res.send(verses))
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    return next(err instanceof CustomError ? err : new DatabaseError('getAllVerses'));
  }
});

export { router as getAllVersesRouter };
