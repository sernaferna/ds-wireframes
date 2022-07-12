import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  DatabaseError,
  CustomError,
  ItemRemovedResponse,
} from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const indexOfItem = db.getIndex('/prayerItems', req.params.id);
      if (indexOfItem < 0) {
        throw new NotFoundError('Prayer item');
      }
      db.delete(`/prayerItems[${indexOfItem}]`);
      res.json(ItemRemovedResponse);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const error = new DatabaseError('deletePrayerItem');
      return next(error);
    }
  }
);

export { router as deletePrayerItemRouter };
