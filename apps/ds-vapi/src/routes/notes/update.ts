import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '@devouringscripture/common';
import { Note } from '@devouringscripture/common';
import { DateTime } from 'luxon';
import { notesDB } from '../../services/notes-db';

const router = express.Router();

router.put(
  '/:id',
  [
    param('id').isUUID().withMessage('ID required'),
    body('id').isUUID().withMessage('Invalid note'),
    body('passageStart').isInt({ min: 1, max: 40000 }).withMessage('Invalid note'),
    body('passageEnd').isInt({ min: 1, max: 40000 }).withMessage('Invalid note'),
    body('lastUpdateDate').isDate().withMessage('Invalid note'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const newNote: Note = req.body;
    console.log(`Update note for ${newNote.id}`);

    try {
      const index = notesDB.getIndex('/notes', newNote.id);
      notesDB.push(`/notes[${index}]/passageStart`, newNote.passageStart);
      notesDB.push(`/notes[${index}]/passageEnd`, newNote.passageEnd);
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
