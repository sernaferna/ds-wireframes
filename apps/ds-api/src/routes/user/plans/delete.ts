import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { validateRequest, NotFoundError, CustomError, DatabaseError } from '@devouringscripture/common';
import { db } from '../../../services/db';

const router = express.Router();

router.delete(
  '/:userId/plans/:planInstanceId',
  [
    param('userId').isUUID().withMessage('Valid User ID required'),
    param('planInstanceId').isUUID().withMessage('Valid Plan Instance ID required'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    const planId: string = req.params.id;
    console.log(`Delete plan called for ${planId}`);

    try {
      const userIndex = db.getIndex('/users', userId);
      if (userIndex < 0) {
        throw new NotFoundError('User not found');
      }

      const planIndex = db.getIndex(`/users[${userIndex}]/plans`, planId, 'planInstanceId');
      if (planIndex < 0) {
        throw new NotFoundError(`Plan not found: ${planId}`);
      }

      db.delete(`/users[${userIndex}]/plans[${planIndex}]`);
      res.send('Item removed');
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const error = new DatabaseError('deletePlan');
      return next(error);
    }
  }
);

export { router as deleteUserPlanRouter };
