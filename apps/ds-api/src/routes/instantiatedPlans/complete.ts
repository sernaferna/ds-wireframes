import express, { Request, Response, NextFunction } from 'express';
import { param, body } from 'express-validator';
import {
  InstantiatedPlanDay,
  InvalidDayForPlanError,
  CustomError,
  DatabaseError,
  InvalidPlanError,
  InstantiatedPlan,
} from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.put(
  '/completeAction/:planId/:day',
  [
    param('planId').isUUID().withMessage('Plan ID required'),
    param('day').isInt().withMessage('Day # required'),
    body('completed').isBoolean().withMessage('Completed indicator missing'),
    body('scheduledDate').notEmpty().withMessage('Scheduled date required'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const planId: string = req.params.planId;
    const dayIndex: number = parseInt(req.params.day);

    let day: InstantiatedPlanDay;
    try {
      day = req.body;
    } catch {
      return next(new InvalidDayForPlanError());
    }

    try {
      const indexOfPlan = db.getIndex('/instantiatedPlans', planId, 'planInstanceId');
      if (indexOfPlan < 0) {
        throw new InvalidPlanError(`Plan ID: ${planId}`);
      }

      try {
        const dayInDB = db.getObject<InstantiatedPlanDay>(`/instantiatedPlans[${indexOfPlan}]/days[${dayIndex}]`);
      } catch {
        throw new InvalidDayForPlanError();
      }

      db.push(`/instantiatedPlans[${indexOfPlan}]/days[${dayIndex}]/completed`, day.completed);
      const plan = db.getObject<InstantiatedPlan>(`/instantiatedPlans[${indexOfPlan}]`);
      if (!plan.days) {
        throw new InvalidPlanError(`${planId} has no days in DB`);
      }
      let completedDays = 0;
      for (const day of plan.days!) {
        if (day.completed) {
          completedDays++;
        }
      }
      const percentComplete = (completedDays / plan.days!.length).toFixed(2);
      db.push(`/instantiatedPlans[${indexOfPlan}]/percentageComplete`, percentComplete);
      res.json(day);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('Complete reading plan item'));
    }
  }
);

export { router as completeIPItemRouter };
