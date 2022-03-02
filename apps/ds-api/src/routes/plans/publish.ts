import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  CustomError,
  DatabaseError,
  PlanStatus,
  PlanAttributes,
  InvalidPlanStatusError,
} from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.put(
  '/:planId/publish',
  [param('planId').isUUID().withMessage('Plan ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const planId: string = req.params.planId;
    console.log(`Publishing plan ${planId}`);

    try {
      const index = db.getIndex('plans', planId);
      if (index < 0) {
        throw new NotFoundError(`Plan ${planId}`);
      }

      const plan = db.getObject<PlanAttributes>(`/plans[${index}]`);
      if (plan.status !== PlanStatus.Saved) {
        throw new InvalidPlanStatusError(plan.status, PlanStatus.Published);
      }
      plan.status = PlanStatus.Published;

      db.push(`/plans[${index}]/status`, PlanStatus.Published);
      res.send(plan);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('publishPlan'));
    }
  }
);

export { router as publishPlanRouter };
