import express, { Request, Response } from 'express';
import { check } from 'express-validator';
import { validateRequest, BaseNote, Note } from '@devouringscripture/common';
import { v4 as uuid4 } from 'uuid';
import { DateTime } from 'luxon';
import { notesDB } from '../../services/notes-db';

const router = express.Router();

router.post(
  '/',
  [
    check('passageStart').isInt({ min: 1, max: 40000 }).withMessage('Start index required'),
    check('passageEnd').isInt({ min: 1, max: 40000 }).withMessage('End index required'),
    check('text').exists().withMessage('Text required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const newBaseItem: BaseNote = req.body;
    console.log(`New note being saved for passage ${newBaseItem.passageStart} to ${newBaseItem.passageEnd}`);

    const newItem: Note = {
      ...newBaseItem,
      id: uuid4(),
      lastUpdateDate: DateTime.now().toISODate(),
    };

    try {
      notesDB.push('/notes[]', newItem);
    } catch (err) {
      res.status(500).send('Error saving to DB');
    }

    res.status(201).send(newItem);
  }
);

export { router as createNewNoteRouter };
