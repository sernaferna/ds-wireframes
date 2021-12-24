import express, { Request, Response } from 'express';
import { PrayerListItem } from '../../dm/PrayerItems';
import { db } from '../../services/db';
import { param } from 'express-validator';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

router.put(
  '/:itemId/markRead',
  [param('itemId').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`markRead called for ${req.params.itemId}`);
    let item: PrayerListItem | null = null;
    try {
      const index = db.getIndex('/prayerItems', req.params.itemId);
      db.push(`/prayerItems[${index}]/completed`, true);
      item = db.getObject<PrayerListItem>(`/prayerItems[${index}]`);
    } catch (err) {
      res.status(500).send('Error updating item');
      return;
    }

    res.send(item);
  }
);

router.put(
  '/:itemId/markUnread',
  [param('itemId').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`markUnread called for ${req.params.itemId}`);
    let item: PrayerListItem | null = null;
    try {
      const index = db.getIndex('/prayerItems', req.params.itemId);
      db.push(`/prayerItems[${index}]/completed`, false);
      item = db.getObject<PrayerListItem>(`/prayerItems[${index}]`);
    } catch (err) {
      res.status(500).send('Error updating item');
      return;
    }

    res.send(item);
  }
);

export { router as markReadRouter };
