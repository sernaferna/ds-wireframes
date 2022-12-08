import express, { Request, Response, NextFunction } from 'express';
import { PrayerListItem, validateRequest, NotFoundError, CustomError, DatabaseError } from '@devouringscripture/common';
import { db } from '../../services/db';
import { param } from 'express-validator';

const router = express.Router();

router.get(
  '/:itemId',
  [param('itemId').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    let item: PrayerListItem | null = null;

    try {
      const index = await db.getIndex('/prayerItems', req.params.itemId);
      if (index < 0) {
        throw new NotFoundError('Prayer item');
      }
      item = await db.getData(`/prayerItems[${index}]`);
    } catch (error) {
      if (error instanceof CustomError) {
        return next(error);
      }

      const newErr = new DatabaseError('getPrayerById');
      return next(newErr);
    }

    res.json(item);
  }
);

export { router as getPIById };
