import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import {
  validateRequest,
  CustomError,
  DatabaseError,
  UserNotFoundError,
  NotFoundError,
} from '@devouringscripture/common';
import { db } from '../../../services/db';

const router = express.Router();

router.delete(
  '/:userId/ip/:ipId',
  [
    param('userId').isUUID().withMessage('User ID Required'),
    param('ipId').isUUID().withMessage('Instantiated Plan ID required'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    const ipId: string = req.params.ipId;
    console.log(`Deleting instantiated plan ${ipId} for user ${userId}`);

    try {
      const userIndex = db.getIndex('/users', userId);
      if (userIndex < 0) {
        throw new UserNotFoundError(userId);
      }

      const planIndex = db.getIndex(`/users[${userIndex}]/instantiatedPlans`, ipId);
      if (planIndex < 0) {
        throw new NotFoundError(`Plan ${ipId}`);
      }

      db.delete(`/users[${userIndex}]/instantiatedPlans[${planIndex}]`);
      res.send('item removed');
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const dbErr = new DatabaseError('error deleting instantiated plan');
      return next(dbErr);
    }
  }
);

export { router as deleteInstantiatedPlanForUserRouter };
