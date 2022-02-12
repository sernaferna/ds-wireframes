import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import {
  validateRequest,
  PlanAttributes,
  CustomError,
  DatabaseError,
  NotFoundError,
  v2GTV1,
  InvalidNewVersionError,
} from '@devouringscripture/common';
import { planValidationRules } from '../../../helpers/planValidationRules';
import { db } from '../../../services/db';

const router = express.Router();

router.put(
  '/:userId/plans/:planId',
  [
    param('userId').isUUID().withMessage('Valid User ID required'),
    param('planId').isUUID().withMessage('Valid Plan ID required'),
  ],
  planValidationRules(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    const planId: string = req.params.planId;
    console.log(`Updating plan ${planId}`);

    try {
      const newPlan: PlanAttributes = req.body;

      const userIndex = db.getIndex('/users', userId);
      if (userIndex < 0) {
        throw new NotFoundError('User not found');
      }

      const planIndex = db.getIndex(`/users[${userIndex}]/plans`, newPlan.id);
      const oldPlan: PlanAttributes = db.getObject<PlanAttributes>(`/users[${userIndex}]/plans[${planIndex}]`);
      if (!oldPlan) {
        throw new NotFoundError(`Plan ID ${newPlan.id}`);
      }
      if (!v2GTV1(newPlan.version, oldPlan.version)) {
        throw new InvalidNewVersionError(oldPlan.version, newPlan.version);
      }

      db.push(`/users[${userIndex}]/plans[${planIndex}]/description`, newPlan.description);
      db.push(`/users[${userIndex}]/plans[${planIndex}]/includeWeekends`, newPlan.includeWeekends);
      db.push(`/users[${userIndex}]/plans[${planIndex}]/includesApocrypha`, newPlan.includesApocrypha);
      db.push(`/users[${userIndex}]/plans[${planIndex}]/length`, newPlan.length);
      db.push(`/users[${userIndex}]/plans[${planIndex}]/name`, newPlan.name);
      db.push(`/users[${userIndex}]/plans[${planIndex}]/osis`, newPlan.osis);
      db.push(`/users[${userIndex}]/plans[${planIndex}]/version`, newPlan.version);
      db.push(`/users[${userIndex}]/plans[${planIndex}]/weeks`, newPlan.weeks);

      const updatedItem: PlanAttributes = db.getObject<PlanAttributes>(`/users[${userIndex}]/plans[${planIndex}]`);
      res.send(updatedItem);
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
