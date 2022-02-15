import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import {
  PlanAttributes,
  validateRequest,
  CustomError,
  DatabaseError,
  UserNotFoundError,
  InstantiatedPlan,
  BaseInstantiatedPlan,
} from '@devouringscripture/common';
import { db } from '../../../services/db';

const router = express.Router();

router.get(
  '/:userId/ip',
  [param('userId').isUUID().withMessage('User ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    console.log(`get all instantiated plans for user ${userId}`);

    try {
      const userIndex = db.getIndex('/users', userId);
      if (userIndex < 0) {
        throw new UserNotFoundError(userId);
      }

      console.log(`user index ${userIndex}`);

      const existingPlans: InstantiatedPlan[] = db.getObject<InstantiatedPlan[]>(
        `/users[${userIndex}]/instantiatedPlans`
      );

      console.log(`${existingPlans.length} existing plans found`);

      const returnArray: BaseInstantiatedPlan[] = existingPlans.slice();

      const userPlans: PlanAttributes[] = db.getObject<PlanAttributes[]>(`/users[${userIndex}]/plans`);
      console.log(`${userPlans.length} user plans found`);
      for (const plan of userPlans) {
        if (existingPlans.filter((p) => p.planInstanceId === plan.planInstanceId).length < 1) {
          const newItem: BaseInstantiatedPlan = { planInstanceId: plan.planInstanceId };
          returnArray.push(newItem);
        }
      }

      const publicPlans: PlanAttributes[] = db.getObject<PlanAttributes[]>('/plans');
      console.log(`${publicPlans.length} public plans found`);
      for (const plan of publicPlans) {
        if (existingPlans.filter((p) => p.planInstanceId === plan.planInstanceId).length < 1) {
          const newItem: BaseInstantiatedPlan = { planInstanceId: plan.planInstanceId };
          returnArray.push(newItem);
        }
      }

      res.send(returnArray);
    } catch (err) {
      console.log(err);
      if (err instanceof CustomError) {
        return next(err);
      }

      const dbErr = new DatabaseError('get all instantiated plans');
      return next(dbErr);
    }
  }
);

export { router as getAllInstantiatedPlansRouter };
