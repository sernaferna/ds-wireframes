import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '@devouringscripture/common';
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
  async (req: Request, res: Response) => {
    const newNote: Note = req.body;
    console.log(`Update note for ${newNote.id}`);

    const bounds: Bounds[] = await getBoundsForPassage(newNote.osis);

    try {
      const index = notesDB.getIndex('/notes', newNote.id);
      notesDB.push(`/notes[${index}]/passageStart`, bounds[0].lowerBound);
      notesDB.push(`/notes[${index}]/passageEnd`, bounds[0].upperBound);
      notesDB.push(`/notes[${index}]/text`, newNote.text);
      notesDB.push(`/notes[${index}]/lastUpdateDate`, DateTime.now().toISODate());
      const updatedItem: Note = notesDB.getObject<Note>(`/notes[${index}]`);
      res.send(updatedItem);
    } catch (err) {
      res.status(500).send('problem saving update');
    }
  }
);

export { router as updateNoteRouter };
