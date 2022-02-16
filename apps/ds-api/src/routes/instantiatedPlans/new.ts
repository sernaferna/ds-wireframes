import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import {
  validateRequest,
  BaseInstantiatedPlan,
  InstantiatedPlan,
  CustomError,
  DatabaseError,
} from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.post(
  '/',
  [body('planInstanceId').isUUID().withMessage('Plan Instance ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const newBasePlan: BaseInstantiatedPlan = req.body;
    console.log(`newIP`);

    try {
      const newPlan: InstantiatedPlan = {
        planInstanceId: newBasePlan.planInstanceId,
        id: uuidv4(),
      };

      db.push(`/instantiatedPlans[]`, newPlan);
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

export { router as newIPRouter };
