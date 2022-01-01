import express, { Request, Response } from 'express';
import { BasePrayerListItem, PrayerListItem, validateRequest } from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../services/db';
import { body } from 'express-validator';
import { DateTime } from 'luxon';

const router = express.Router();

router.post(
  '/',
  [body('text').notEmpty().withMessage('Text required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const newBaseItem: BasePrayerListItem = req.body;
    console.log(
      `new prayer item API called; text of item is '${newBaseItem.text.substring(0, 20)}${
        newBaseItem.text.length > 20 ? '...' : ''
      }'`
    );
    const newItem: PrayerListItem = {
      ...newBaseItem,
      id: uuidv4(),
      date: DateTime.now().toISODate(),
      completed: false,
    };

    try {
      db.push('/prayerItems[]', newItem);
    } catch (err) {
      res.status(500).send('Error adding item');
    }

    res.send(newItem);
  }
);

export { router as newPrayerItemRouter };
