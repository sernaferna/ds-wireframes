import express, { Request, Response } from 'express';
import { BasePrayerListItem, PrayerListItem } from '@devouringscripture/common/src/dm/Prayer';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../services/db';
import { body } from 'express-validator';
import { validateRequest } from '../../middleware/validateRequest';
import { DateTime } from 'luxon';

const router = express.Router();

router.post(
  '/',
  [body('title').notEmpty().withMessage('Title required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`newItem API called; title of item is ${req.body.title}`);
    const newBaseItem: BasePrayerListItem = req.body;
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
