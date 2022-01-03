import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { validateRequest } from '@devouringscripture/common';
import { Note } from '@devouringscripture/common';
import { notesDB } from '../../services/notes-db';

const router = express.Router();

export const getNoteById = (id: string): Note => {
  let item: Note | null = null;

  try {
    const index = notesDB.getIndex('/notes', id);
    item = notesDB.getData(`/notes[${index}]`);
  } catch (err) {
    throw err;
  }

  return item!;
};

router.get(
  '/:id',
  [param('id').isUUID().withMessage('ID required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`API called to get note ${req.params.id}`);

    let item: Note | null = null;
    try {
      item = getNoteById(req.params.id);
      res.send(item);
    } catch (err) {
      res.status(404).send('item not found');
    }
  }
);

export { router as getNoteByIDRouter };
