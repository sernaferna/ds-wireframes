import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { validateRequest, NotFoundError, PlanAttributes, CustomError, DatabaseError } from '@devouringscripture/common';
import { db } from '../../../services/db';

const router = express.Router();

router.get(
  '/:userId/plans/:id',
  [
    param('userId').isUUID().withMessage('Valid User ID required'),
    param('id').isUUID().withMessage('Valid Plan ID required'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    const planId: string = req.params.id;
    console.log(`Get Plan for User by ID called: ${planId}`);

    try {
      const userIndex = db.getIndex('/users', userId);
      if (userIndex < 0) {
        throw new NotFoundError('User not found');
      }

      console.log(`user ${userIndex}`);

      const planIndex = db.getIndex(`/users[${userIndex}]/plans`, planId);
      if (planIndex < 0) {
        throw new NotFoundError('Plan not found');
      }

      console.log(`user ${userIndex} and plan ${planIndex}`);

      const item: PlanAttributes = db.getObject<PlanAttributes>(`/users[${userIndex}]/plans[${planIndex}]`);
      console.log('got item');
      console.log(item.id);
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

export { router as getUserPlanByIdRouter };
