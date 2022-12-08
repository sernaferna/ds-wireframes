import express, { Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import { validateRequest, CustomError, DatabaseError, NotFoundError } from '@devouringscripture/common';
import { Note } from '@devouringscripture/common';
import { DateTime } from 'luxon';
import { notesDB } from '../../services/notes-db';
import { Bounds, getBoundsForPassage } from '../verses/getBoundsForPassage';

const router = express.Router();

router.put(
  '/:id',
  [
    param('id').isUUID().withMessage('ID required'),
    body('id').isUUID().withMessage('Invalid note'),
    body('osis').exists().withMessage('OSIS required'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const newNote: Note = req.body;

    const bounds: Bounds[] = await getBoundsForPassage(newNote.osis);

    try {
      const index = await notesDB.getIndex('/notes', newNote.id);
      if (index < 0) {
        throw new NotFoundError(`Note not found: ${newNote.id}`);
      }

      await notesDB.push(`/notes[${index}]/passageStart`, bounds[0].lowerBound);
      await notesDB.push(`/notes[${index}]/passageEnd`, bounds[0].upperBound);
      await notesDB.push(`/notes[${index}]/text`, newNote.text);
      await notesDB.push(`/notes[${index}]/lastUpdateDate`, DateTime.now().toISODate());
      await notesDB.push(`/notes[${index}]/osis`, newNote.osis);
      const updatedItem: Note = await notesDB.getObject<Note>(`/notes[${index}]`);
      res.json(updatedItem);
    } catch (err) {
      return next(err instanceof CustomError ? err : new DatabaseError('updateNote'));
    }
  }
);

export { router as updateNoteRouter };
