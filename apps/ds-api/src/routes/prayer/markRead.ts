import express, { Request, Response, NextFunction } from 'express';
import { PrayerListItem, validateRequest, DatabaseError, NotFoundError } from '@devouringscripture/common';
import { db } from '../../services/db';
import { param } from 'express-validator';

const router = express.Router();

router.put(
  '/:itemId/markRead',
  [param('itemId').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    let item: PrayerListItem | null = null;
    try {
      const index = await db.getIndex('/prayerItems', req.params.itemId);
      if (index < 0) {
        throw new NotFoundError('Prayer item');
      }
      await db.push(`/prayerItems[${index}]/completed`, true);
      item = await db.getObject<PrayerListItem>(`/prayerItems[${index}]`);
    } catch (err) {
      const error = new DatabaseError('markPrayerRead');
      next(error);
    }

    res.json(item);
  }
);

router.put(
  '/:itemId/markUnread',
  [param('itemId').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    let item: PrayerListItem | null = null;
    try {
      const index = await db.getIndex('/prayerItems', req.params.itemId);
      if (index < 0) {
        throw new NotFoundError('Prayer item');
      }
      await db.push(`/prayerItems[${index}]/completed`, false);
      item = await db.getObject<PrayerListItem>(`/prayerItems[${index}]`);
    } catch (err) {
      const error = new DatabaseError('markPrayerRead');
      return next(error);
    }

    res.json(item);
  }
);

export { router as markReadRouter };
