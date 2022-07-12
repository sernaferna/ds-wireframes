import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  CustomError,
  DatabaseError,
  PlanStatus,
  ItemRemovedResponse,
} from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.delete(
  '/:planInstanceId',
  [param('planInstanceId').isUUID().withMessage('Valid Instance ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const planInstanceId = req.params.planInstanceId;

    try {
      const index = db.getIndex(`/plans`, planInstanceId, 'planInstanceId');
      if (index < 0) {
        throw new NotFoundError(`Plan ${planInstanceId}`);
      }
      db.push(`/plans[${index}]/status`, PlanStatus.Deleted);
      res.json(ItemRemovedResponse);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const error = new DatabaseError('deletePlan');
      return next(error);
    }
  }
);

export { router as deletePublicPlanRouter };
