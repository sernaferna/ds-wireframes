import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { validateRequest, NotFoundError, DatabaseError, CustomError } from '@devouringscripture/common';
import { notesDB } from '../../services/notes-db';

const router = express.Router();

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const indexOfItem = notesDB.getIndex('/notes', req.params.id);
      if (indexOfItem < 0) {
        throw new NotFoundError('Note');
      }
      notesDB.delete(`/notes[${indexOfItem}]`);
      res.send('Item removed');
    } catch (err) {
      return next(err instanceof CustomError ? err : new DatabaseError('deleteNote'));
    }
  }
);

export { router as deleteNoteRouter };
