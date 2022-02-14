import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { validateRequest, NotFoundError, PlanAttributes, CustomError, DatabaseError } from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.get(
  '/:planInstanceId',
  [param('planInstanceId').isUUID().withMessage('Valid Instance ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Get Plan by ID called: ${req.params.planInstanceId}`);

    try {
      const index = db.getIndex('/plans', req.params.id, 'planInstanceId');
      if (index < 0) {
        throw new NotFoundError('Plan not found');
      }

      const item: PlanAttributes = db.getObject<PlanAttributes>(`/plans[${index}]`);
      res.send(item);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const dbErr = new DatabaseError('getPlanById');
      return next(dbErr);
    }
  }
);

export { router as getPublicPlanByIdRouter };
