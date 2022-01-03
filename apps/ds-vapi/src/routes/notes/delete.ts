import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { validateRequest } from '@devouringscripture/common';
import { notesDB } from '../../services/notes-db';

const router = express.Router();

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('ID required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`Calling delete note for ${req.params.id}`);

    try {
      const indexOfItem = notesDB.getIndex('/notes', req.params.id);
      notesDB.delete(`/notes[${indexOfItem}]`);
      res.send('Item removed');
    } catch (err) {
      res.status(500).send('Error removing item');
    }
  }
);

export { router as deleteNoteRouter };
