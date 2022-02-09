import express, { Request, Response, NextFunction } from 'express';
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
  '/:planId',
  planValidationRules(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newPlan: PlanAttributes = req.body;

      const index = db.getIndex('/plans', newPlan.id);
      const oldPlan: PlanAttributes = db.getObject<PlanAttributes>(`/plans[${index}]`);
      if (!oldPlan) {
        throw new NotFoundError(`Plan ID ${newPlan.id}`);
      }
      if (!v2GTV1(newPlan.version, oldPlan.version)) {
        throw new InvalidNewVersionError(oldPlan.version, newPlan.version);
      }

      db.push(`/plans[${index}]/description`, newPlan.description);
      db.push(`/plans[${index}]/includeWeekends`, newPlan.includeWeekends);
      db.push(`/plans[${index}]/includesApocrypha`, newPlan.includesApocrypha);
      db.push(`/plans[${index}]/length`, newPlan.length);
      db.push(`/plans[${index}]/name`, newPlan.name);
      db.push(`/plans[${index}]/osis`, newPlan.osis);
      db.push(`/plans[${index}]/version`, newPlan.version);
      db.push(`/plans[${index}]/weeks`, newPlan.weeks);

      const updatedItem: PlanAttributes = db.getObject<PlanAttributes>(`/plans[${index}]`);
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

export { router as updatePublicPlanRouter };
