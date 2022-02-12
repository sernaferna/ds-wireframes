import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { PlanAttributes, validateRequest, NotFoundError, CustomError } from '@devouringscripture/common';
import { db } from '../../../services/db';

const router = express.Router();

router.get(
  '/:userId/plans',
  [param('userId').isUUID().withMessage('Valid UserID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('getAll Plans called');

    try {
      const userIndex = db.getIndex('/users', req.params.userId);
      if (userIndex < 0) {
        throw new NotFoundError('User not found');
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
