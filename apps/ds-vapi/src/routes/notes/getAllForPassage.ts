import express, { Request, Response } from 'express';
import { check } from 'express-validator';
import { Note, validateRequest } from '@devouringscripture/common';
import { isPassageRefValid } from '@devouringscripture/refparse';
import { Bounds, getBoundsForPassage } from '../verses/getBoundsForPassage';
import { getAllNotes } from './getAll';

const router = express.Router();

router.post(
  '/notesForPassage',
  [check('osis').exists().withMessage('OSIS string required')],
  validateRequest,
  async (req: Request, res: Response) => {
    if (!isPassageRefValid(req.body.osis)) {
      res.status(400).send('Invalid passage');
    }

    getBoundsForPassage(req.body.osis)
      .then((bounds) => {
        const all: Note[] = getAllNotes();
        const response: Note[] = all.filter(
          (item) => item.passageStart >= bounds.lowerBound && item.passageEnd <= bounds.upperBound
        );
        res.send(response);
      })
      .catch((err) => res.status(500).send('error fetching data'));
  }
);

export { router as getNotesForPassageRouter };
