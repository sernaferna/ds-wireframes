import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BasePassage, Passage, validateRequest } from '@devouringscripture/common';
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
  async (req: Request, res: Response) => {
    const newBaseItem: BasePassage = req.body;
    console.log(`New reading passage called with OSIS ${newBaseItem.osis}`);
    const newItem: Passage = {
      ...newBaseItem,
      id: uuidv4(),
      date: DateTime.now().toISODate(),
    };

    try {
      db.push('/passages[]', newItem);
    } catch (err) {
      res.status(500).send('Error saving item');
    }

    res.status(201).send(newItem);
  }
);

export { router as newReadingItem };
