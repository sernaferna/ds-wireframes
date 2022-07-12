import express, { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validateRequest, BaseNote, Note, CustomError, DatabaseError } from '@devouringscripture/common';
import { v4 as uuid4 } from 'uuid';
import { DateTime } from 'luxon';
import { notesDB } from '../../services/notes-db';
import { Bounds, getBoundsForPassage } from '../verses/getBoundsForPassage';

const router = express.Router();

router.post(
  '/',
  [check('text').exists().withMessage('Text required'), check('osis').exists().withMessage('OSIS required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const newBaseItem: BaseNote = req.body;

    const bounds: Bounds[] = await getBoundsForPassage(newBaseItem.osis);

    const newItem: Note = {
      ...newBaseItem,
      id: uuid4(),
      lastUpdateDate: DateTime.now().toISODate(),
      passageStart: bounds[0].lowerBound,
      passageEnd: bounds[0].upperBound,
    };

    try {
      notesDB.push('/notes[]', newItem);
      res.status(201).json(newItem);
    } catch (err) {
      return next(err instanceof CustomError ? err : new DatabaseError('createNewNote'));
    }
  }
);

export { router as createNewNoteRouter };
