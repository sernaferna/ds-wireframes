import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import {
  validateRequest,
  CustomError,
  DatabaseError,
  NotFoundError,
  ItemRemovedResponse,
} from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.delete(
  '/:ipId',
  [param('ipId').isUUID().withMessage('Instantiated Plan ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const ipId: string = req.params.ipId;

    try {
      const planIndex = await db.getIndex(`/instantiatedPlans`, ipId, 'planInstanceId');
      if (planIndex < 0) {
        throw new NotFoundError(`Plan ${ipId}`);
      }

      await db.delete(`/instantiatedPlans[${planIndex}]`);
      res.json(ItemRemovedResponse);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const dbErr = new DatabaseError('error deleting instantiated plan');
      return next(dbErr);
    }
  }
);

export { router as deleteInstantiatedPlanRouter };
