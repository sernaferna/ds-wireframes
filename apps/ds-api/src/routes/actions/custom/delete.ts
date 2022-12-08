import express, { Request, Response, NextFunction } from 'express';
import { db } from '../../../services/db';
import { param } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  DatabaseError,
  CustomError,
  ItemRemovedResponse,
} from '@devouringscripture/common';

const router = express.Router();

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const indexOfItem = await db.getIndex('/actions/custom', req.params.id);
      if (indexOfItem < 0) {
        throw new NotFoundError('custom action');
      }
      await db.delete(`/actions/custom[${indexOfItem}]`);
      res.status(200).json(ItemRemovedResponse);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('deleteCustomAction'));
    }
  }
);

export { router as deleteCustomActionRouter };
