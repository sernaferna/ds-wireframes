import express, { Request, Response, NextFunction } from 'express';
import { param, body } from 'express-validator';
import {
  validateRequest,
  InstantiatedPlan,
  CustomError,
  NotFoundError,
  DatabaseError,
} from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.put(
  '/:ipId',
  [
    param('ipId').isUUID().withMessage('Instantiated Plan Instance ID required'),
    body('planInstanceId').isUUID().withMessage('IP IDs must match'),
    body('id').isUUID().withMessage('Instantiated Plan ID required'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const newIP: InstantiatedPlan = req.body;

    try {
      const planIndex = await db.getIndex(`/instantiatedPlans`, newIP.id);
      if (planIndex < 0) {
        throw new NotFoundError('Instantiated Plan not found in DB');
      }

      await db.push(`/instantiatedPlans[${planIndex}]/percentageComplete`, newIP.percentageComplete);

      res.json(newIP);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const dbErr = new DatabaseError('Error updating instantiated plan');
      return next(dbErr);
    }
  }
);

export { router as updateInstantiatedPlanRouter };
