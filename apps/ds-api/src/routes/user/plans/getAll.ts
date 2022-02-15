import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { PlanAttributes, validateRequest, UserNotFoundError, CustomError } from '@devouringscripture/common';
import { db } from '../../../services/db';

const router = express.Router();

router.get(
  '/:userId/plans',
  [param('userId').isUUID().withMessage('Valid UserID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    console.log(`getAll Plans called for user ${userId}`);

    try {
      const userIndex = db.getIndex('/users', userId);
      if (userIndex < 0) {
        throw new UserNotFoundError(userId);
      }

      const plans: PlanAttributes[] = db.getObject<PlanAttributes[]>(`/users[${userIndex}]/plans`);
      res.send(plans);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      res.send([]);
    }
  }
);

export { router as getAllPlansForUserRouter };
