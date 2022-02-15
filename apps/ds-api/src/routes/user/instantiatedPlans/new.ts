import express, { Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import {
  validateRequest,
  BaseInstantiatedPlan,
  InstantiatedPlan,
  UserNotFoundError,
  CustomError,
  DatabaseError,
} from '@devouringscripture/common';
import { db } from '../../../services/db';

const router = express.Router();

router.post(
  '/:userId/ip',
  [
    param('userId').isUUID().withMessage('Valid user ID required'),
    body('planInstanceId').isUUID().withMessage('Plan Instance ID required'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    const newBasePlan: BaseInstantiatedPlan = req.body;
    console.log(`newIP for user ${userId}`);

    try {
      const newPlan: InstantiatedPlan = {
        planInstanceId: newBasePlan.planInstanceId,
        id: uuidv4(),
      };

      const userIndex = db.getIndex('/users', userId);
      if (userIndex < 0) {
        throw new UserNotFoundError(userId);
      }
      db.push(`/users[${userIndex}]/instantiatedPlans[]`, newPlan);
      res.status(201).send(newPlan);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const dbErr = new DatabaseError('Create IP for user');
      return next(dbErr);
    }
  }
);

export { router as newIPForUserRouter };
