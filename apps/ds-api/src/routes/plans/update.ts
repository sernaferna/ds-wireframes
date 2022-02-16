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
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.put(
  '/:planInstanceId',
  planValidationRules(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newPlan: PlanAttributes = req.body;

      const index = db.getIndex('/plans', newPlan.planInstanceId, 'planInstanceId');
      const oldPlan: PlanAttributes = db.getObject<PlanAttributes>(`/plans[${index}]`);
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
        isAdmin: newPlan.isAdmin,
        includesApocrypha: newPlan.includesApocrypha,
        includeWeekends: newPlan.includeWeekends,
        version: newPlan.version,
        osis: newPlan.osis,
        weeks: newPlan.weeks.slice(),
        planId: oldPlan.planId,
        planInstanceId: uuidv4(),
      };

      db.push(`/plans[]`, newPlanForDB);

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

export { router as updatePublicPlanRouter };
