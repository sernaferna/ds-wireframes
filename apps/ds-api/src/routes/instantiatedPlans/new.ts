import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import {
  validateRequest,
  BaseInstantiatedPlan,
  InstantiatedPlan,
  InstantiatedPlanDay,
  CustomError,
  DatabaseError,
  InvalidPlanDaysError,
} from '@devouringscripture/common';
import { db } from '../../services/db';
import { DateTime } from 'luxon';
import { getPlanById } from '../plans/byId';
import { captureRejectionSymbol } from 'events';

const router = express.Router();

router.post(
  '/',
  [body('planInstanceId').isUUID().withMessage('Plan Instance ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const newBaseIP: BaseInstantiatedPlan = req.body;

    try {
      const plan = getPlanById(newBaseIP.planInstanceId);
      if (!plan.days) {
        throw new InvalidPlanDaysError(plan.days);
      }

      const days: InstantiatedPlanDay[] = [];
      let currentDay = DateTime.now();

      for (let i = 0; i < plan.days!.length; i++) {
        if (!plan.includeWeekends && currentDay.weekday === 6) {
          currentDay = currentDay.plus({ days: 2 });
        }
        if (!plan.includeWeekends && currentDay.weekday === 7) {
          currentDay = currentDay.plus({ days: 1 });
        }
        days.push({ completed: false, scheduledDate: currentDay.toISODate() });
        currentDay = currentDay.plus({ days: 1 });
      }

      const newIP: InstantiatedPlan = {
        planInstanceId: newBaseIP.planInstanceId,
        percentageComplete: newBaseIP.percentageComplete,
        id: uuidv4(),
        days: days,
      };

      db.push(`/instantiatedPlans[]`, newIP);
      res.status(201).send(newIP);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const dbErr = new DatabaseError('Create IP for user');
      return next(dbErr);
    }
  }
);

export { router as newIPRouter };
