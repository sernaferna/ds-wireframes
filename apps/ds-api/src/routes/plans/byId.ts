import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { validateRequest, NotFoundError, PlanAttributes, CustomError, DatabaseError } from '@devouringscripture/common';
import { db } from '../../services/db';

/**
 * Helper function, since other services / APIs also need plans
 *
 * @param id Plan Instance ID
 * @returns Plan
 */
export const getPlanById = (id: string): PlanAttributes => {
  try {
    const index = db.getIndex('/plans', id, 'planInstanceId');
    if (index < 0) {
      throw new NotFoundError(`Plan ${id}`);
    }
    const item = db.getObject<PlanAttributes>(`/plans[${index}]`);
    return item;
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    } else {
      throw new DatabaseError('getPlanById');
    }
  }
};

const router = express.Router();

router.get(
  '/:planInstanceId',
  [param('planInstanceId').isUUID().withMessage('Valid Instance ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const planInstanceId: string = req.params.planInstanceId;

    try {
      const item = getPlanById(planInstanceId);
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
