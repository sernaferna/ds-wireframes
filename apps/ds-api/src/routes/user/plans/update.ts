import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import {
  validateRequest,
  PlanAttributes,
  CustomError,
  DatabaseError,
  NotFoundError,
  UserNotFoundError,
  v2GTV1,
  InvalidNewVersionError,
} from '@devouringscripture/common';
import { planValidationRules } from '../../../helpers/planValidationRules';
import { db } from '../../../services/db';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.put(
  '/:userId/plans/:planInstanceId',
  [
    param('userId').isUUID().withMessage('Valid User ID required'),
    param('planInstanceId').isUUID().withMessage('Valid Plan ID required'),
  ],
  planValidationRules(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    const planInstanceId: string = req.params.planInstanceId;
    console.log(`Updating plan ${planInstanceId}`);

    try {
      const newPlan: PlanAttributes = req.body;

      const userIndex = db.getIndex('/users', userId);
      if (userIndex < 0) {
        throw new UserNotFoundError(userId);
      }

      const planIndex = db.getIndex(`/users[${userIndex}]/plans`, newPlan.planInstanceId, 'planInstanceId');
      const oldPlan: PlanAttributes = db.getObject<PlanAttributes>(`/users[${userIndex}]/plans[${planIndex}]`);
      if (!oldPlan) {
        throw new NotFoundError(`Plan ID ${newPlan.planInstanceId}`);
      }
      if (!v2GTV1(newPlan.version, oldPlan.version)) {
        throw new InvalidNewVersionError(oldPlan.version, newPlan.version);
      }

      const newPlanForDB: PlanAttributes = {
        name: newPlan.name,
        description: newPlan.description,
        length: newPlan.length,
        isAdmin: false,
        includesApocrypha: newPlan.includesApocrypha,
        includeWeekends: newPlan.includeWeekends,
        version: newPlan.version,
        osis: newPlan.osis,
        weeks: newPlan.weeks.slice(),
        planId: oldPlan.planId,
        planInstanceId: uuidv4(),
      };
      db.push(`/users[${userIndex}]/plans[]`, newPlanForDB);

      res.send(newPlanForDB);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const dbErr = new DatabaseError('updatePlan DB error');
      return next(dbErr);
    }
  }
);

export { router as updatePlanForUserRouter };
