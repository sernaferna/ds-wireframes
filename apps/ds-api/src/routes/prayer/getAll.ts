import express, { Request, Response } from 'express';
import { PrayerListItems } from '@devouringscripture/common';
import { generatePrayerItems } from '../../helpers/PrayerHelpers';
import { db } from '../../services/db';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let response;

  try {
    response = db.getObject<PrayerListItems>('/prayerItems');
  } catch (err) {
    response = generatePrayerItems();
    db.push('/prayerItems', response);
  }

  res.json(response);
});

export { router as getAllPrayerItemsRouter };
