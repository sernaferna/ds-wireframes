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
import { planValidationRules } from '../../helpers/planValidationRules';
import { db } from '../../services/db';

const router = express.Router();

router.put(
  '/:planId',
  planValidationRules(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newPlan: PlanAttributes = req.body;

      const index = db.getIndex('/plans/custom', newPlan.id);
      const oldPlan: PlanAttributes = db.getObject<PlanAttributes>(`/plans/custom[${index}]`);
      if (!oldPlan) {
        throw new NotFoundError(`Plan ID ${newPlan.id}`);
      }
      if (!v2GTV1(newPlan.version, oldPlan.version)) {
        throw new InvalidNewVersionError(oldPlan.version, newPlan.version);
      }

      db.push(`/plans/custom[${index}]/description`, newPlan.description);
      db.push(`/plans/custom[${index}]/includeWeekends`, newPlan.includeWeekends);
      db.push(`/plans/custom[${index}]/includesApocrypha`, newPlan.includesApocrypha);
      db.push(`/plans/custom[${index}]/length`, newPlan.length);
      db.push(`/plans/custom[${index}]/name`, newPlan.name);
      db.push(`/plans/custom[${index}]/osis`, newPlan.osis);
      db.push(`/plans/custom[${index}]/version`, newPlan.version);
      db.push(`/plans/custom[${index}]/weeks`, newPlan.weeks);

      const updatedItem: PlanAttributes = db.getObject<PlanAttributes>(`/plans/custom[${index}]`);
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

export { router as updatePlanRouter };
