import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import {
  validateRequest,
  DatabaseError,
  BasePlanAttributes,
  PlanAttributes,
  CustomError,
  NotFoundError,
} from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../services/db';
import { basePlanValidationRules } from '../../../helpers/planValidationRules';

const router = express.Router();

router.post(
  '/:userId/plans',
  [param('userId').isUUID().withMessage('Valid User ID Required')],
  basePlanValidationRules(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    const newBaseItem: BasePlanAttributes = req.body;
    console.log(`Creating new plan for user ${userId}; plan ${newBaseItem.name}`);

    try {
      const userIndex = db.getIndex('/users', userId);
      if (userIndex < 0) {
        throw new NotFoundError('User not found');
      }

      const newItem: PlanAttributes = {
        ...newBaseItem,
        planInstanceId: uuidv4(),
        planId: uuidv4(),
      };
      db.push(`/users[${userIndex}]/plans[]`, newItem);
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

export { router as newUserPlan };
