import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { CustomError, DatabaseError, validateRequest, Note, NotFoundError } from '@devouringscripture/common';
import { notesDB } from '../../services/notes-db';

const router = express.Router();

export const getNoteById = (id: string): Note => {
  try {
    const index = notesDB.getIndex('/notes', id);
    if (index < 0) {
      throw new NotFoundError('Note');
    }
    const item: Note = notesDB.getData(`/notes[${index}]`);
    return item;
  } catch (err) {
    throw err;
  }
};

router.get(
  '/:id',
  [param('id').isUUID().withMessage('ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    let item: Note | null = null;
    try {
      item = getNoteById(req.params.id);
      res.send(item);
    } catch (err) {
      return next(err instanceof CustomError ? err : new DatabaseError('getNoteByID'));
    }
  }
);

export { router as getNoteByIDRouter };
