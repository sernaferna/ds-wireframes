import express, { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { Note, validateRequest, InvalidPassageError, DatabaseError, CustomError } from '@devouringscripture/common';
import { isPassageRefValid } from '@devouringscripture/refparse';
import { getBoundsForPassage } from '../verses/getBoundsForPassage';
import { getAllNotes } from './getAll';

const router = express.Router();

router.post(
  '/notesForPassage',
  [check('osis').exists().withMessage('OSIS string required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!isPassageRefValid(req.body.osis)) {
        throw new InvalidPassageError(req.body.osis);
      }

      getBoundsForPassage(req.body.osis)
        .then((bounds) => {
          const all: Note[] = getAllNotes();
          const response: Note[] = all.filter(
            (item) => item.passageStart >= bounds.lowerBound && item.passageEnd <= bounds.upperBound
          );
          res.send(response);
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      return next(err instanceof CustomError ? err : new DatabaseError('getNotesForPassage'));
    }
  }
);

export { router as getNotesForPassageRouter };
