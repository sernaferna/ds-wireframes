import express, { Request, Response } from 'express';
import { PrayerListItem, validateRequest } from '@devouringscripture/common';
import { db } from '../../services/db';
import { param } from 'express-validator';

const router = express.Router();

router.get(
  '/:itemId',
  [param('itemId').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`getItemById called with ${req.params.itemId}`);
    let item: PrayerListItem | null = null;

    try {
      const index = db.getIndex('/prayerItems', req.params.itemId);
      item = db.getData(`/prayerItems[${index}]`);
    } catch (error) {
      res.status(404).send('item not found');
      return;
    }

    res.send(item);
  }
);

export { router as getPIById };
