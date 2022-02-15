import express, { Request, Response, NextFunction } from 'express';
import { param, body } from 'express-validator';
import {
  validateRequest,
  InstantiatedPlan,
  CustomError,
  UserNotFoundError,
  NotFoundError,
  DatabaseError,
} from '@devouringscripture/common';
import { db } from '../../../services/db';

const router = express.Router();

router.put(
  '/:userId/ip/:ipId',
  [
    param('userId').isUUID().withMessage('User ID Required'),
    param('ipId').isUUID().withMessage('Instantiated Plan Instance ID required'),
    body('planInstanceId').withMessage('IP IDs must match'),
    body('id').isUUID().withMessage('Instantiated Plan ID required'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    const newIP: InstantiatedPlan = req.body;
    console.log(`updating IP ${newIP.id} for user ${userId}`);

    try {
      const userIndex = db.getIndex('/users', userId);
      if (userIndex < 0) {
        throw new UserNotFoundError(userId);
      }

      const planIndex = db.getIndex(`/users[${userIndex}]/instantiatedPlans`, newIP.id);
      if (planIndex < 0) {
        throw new NotFoundError('Instantiated Plan not found in DB');
      }

      db.push(`/users[${userIndex}]/instantiatedPlans[${planIndex}]/percentageComplete`, newIP.percentageComplete);

      res.send(newIP);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const dbErr = new DatabaseError('Error updating instantiated plan');
      return next(dbErr);
    }
  }
);

export { router as updateInstantiatedPlanForUser };
