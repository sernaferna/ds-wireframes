import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { BasePassage, Passage, validateRequest, CustomError, DatabaseError } from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import { db } from '../../../services/db';

const router = express.Router();

router.post(
  '/',
  [
    body('osis').notEmpty().withMessage('OSIS required'),
    body('version').isAlpha().notEmpty().withMessage('Version required'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const newBaseItem: BasePassage = req.body;
    const newItem: Passage = {
      ...newBaseItem,
      id: uuidv4(),
      date: DateTime.now().toISODate(),
    };

    try {
      await db.push('/passages[]', newItem);
      res.status(201).json(newItem);
    } catch (err) {
      return next(err instanceof CustomError ? err : new DatabaseError('newReadingItem'));
    }
  }
);

export { router as newReadingItem };
