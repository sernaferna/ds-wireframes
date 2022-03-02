import express, { Request, Response, NextFunction } from 'express';
import {
  validateRequest,
  DatabaseError,
  BasePlanAttributes,
  PlanAttributes,
  CustomError,
  PlanStatus,
} from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../services/db';
import { basePlanValidationRules } from '../../helpers/planValidationRules';

const router = express.Router();

router.post(
  '/',
  basePlanValidationRules(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newBaseItem: BasePlanAttributes = req.body;
      console.log(`Creating new plan named ${newBaseItem.name}`);
      const newItem: PlanAttributes = {
        ...newBaseItem,
        planId: uuidv4(),
        planInstanceId: uuidv4(),
        status: PlanStatus.Saved,
      };
      db.push('/plans[]', newItem);
      res.status(201).send(newItem);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const error = new DatabaseError('newPlan');
      return next(error);
    }
  }
);

export { router as newPublicReadingPlan };
