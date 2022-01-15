import express, { Request, Response, NextFunction } from 'express';
import { Note, InvalidPassageError, DatabaseError, CustomError } from '@devouringscripture/common';
import { isReferenceValid } from '@devouringscripture/refparse';
import { getBoundsForPassage, Bounds } from '../verses/getBoundsForPassage';
import { getAllNotes } from './getAll';

const router = express.Router();

router.post('/notesForPassage', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!isReferenceValid(req.body.osis)) {
      throw new InvalidPassageError(req.body.osis);
    }

    const boundsForPassage: Bounds[] = await getBoundsForPassage(req.body.osis);

    const all: Note[] = getAllNotes();
    const response: Note[] = all.filter((item) => {
      for (let i = 0; i < boundsForPassage.length; i++) {
        if (item.passageStart >= boundsForPassage[i].lowerBound && item.passageEnd <= boundsForPassage[i].upperBound) {
          return true;
        }
      }

      return false;
    });

    return res.send(response);
  } catch (err) {
    return next(err instanceof CustomError ? err : new DatabaseError('getNotesForPassage'));
  }
});

export { router as getNotesForPassageRouter };
