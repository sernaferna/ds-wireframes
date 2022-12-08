import express, { Request, Response, NextFunction } from 'express';
import {
  validateRequest,
  PlanAttributes,
  BasePlanAttributes,
  PlanStatus,
  InvalidPlanError,
  CustomError,
  DatabaseError,
  v2GTV1,
  PlanVersionError,
  InvalidPlanStatusError,
  isReferenceValid,
  InvalidPlanDaysError,
  PlanAdminToNonError,
} from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';
import { basePlanValidationRules } from '../../helpers/planValidationRules';
import { deleteOldPlanIfNotInUse } from './save';
import { db } from '../../services/db';

const router = express.Router();

router.post(
  '/publish',
  basePlanValidationRules(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let plan: PlanAttributes;

      try {
        if (req.body.planInstanceId) {
          plan = req.body;
        } else {
          const basePlan: BasePlanAttributes = req.body;
          plan = {
            ...basePlan,
            planInstanceId: uuidv4(),
            planId: uuidv4(),
            status: PlanStatus.Unsaved,
          };
        }
      } catch (err) {
        throw new InvalidPlanError(`Name: ${req.body.name || ''}; description: ${req.body.description || ''}`);
      }

      const numExpectedDays = plan.length * (plan.includeWeekends ? 7 : 5);
      if (!plan.days || plan.days.length !== numExpectedDays) {
        throw new InvalidPlanError("Week/day data doesn't match length attribute");
      }

      const invalidDays = plan.days.filter((day) => !isReferenceValid(day.osis));
      if (invalidDays.length > 0) {
        throw new InvalidPlanDaysError(plan.days);
      }

      if (plan.status === PlanStatus.Unsaved) {
        plan.status = PlanStatus.Published;
        await db.push('/plans[]', plan);
        return res.status(201).json(plan);
      }

      if (plan.status === PlanStatus.Saved) {
        plan.status = PlanStatus.Published;
        const oldIndex = await db.getIndex('/plans', plan.planInstanceId, 'planInstanceId');
        if (oldIndex < 0) {
          throw new InvalidPlanError('Plan not found');
        }
        await db.push(`/plans[${oldIndex}]/name`, plan.name);
        await db.push(`/plans[${oldIndex}]/description`, plan.description);
        await db.push(`/plans[${oldIndex}]/includeWeekends`, plan.includeWeekends);
        await db.push(`/plans[${oldIndex}]/includesApocrypha`, plan.includesApocrypha);
        await db.push(`/plans[${oldIndex}]/isAdmin`, plan.isAdmin);
        await db.push(`/plans[${oldIndex}]/length`, plan.length);
        await db.push(`/plans[${oldIndex}]/isFreeform`, plan.isFreeform);
        // await db.push(`/plans[${oldIndex}]/osis`, plan.osis); // can save OSIS, but not Publish
        await db.delete(`/plans[${oldIndex}]/osis`);
        await db.push(`/plans[${oldIndex}]/status`, plan.status);
        await db.push(`/plans[${oldIndex}]/version`, plan.version);
        await db.push(`/plans[${oldIndex}]/days`, plan.days);
        return res.json(plan);
      }

      if (plan.status === PlanStatus.Deleted) {
        throw new InvalidPlanStatusError(plan.status, PlanStatus.Saved);
      }

      //anything else means published
      const oldPlanIndex = await db.getIndex('/plans', plan.planInstanceId, 'planInstanceId');
      if (oldPlanIndex < 0) {
        throw new InvalidPlanError('Plan not found');
      }
      const oldPlan = await db.getObject<PlanAttributes>(`/plans[${oldPlanIndex}]`);
      if (!v2GTV1(plan.version, oldPlan.version)) {
        throw new PlanVersionError(plan.version);
      }
      if (oldPlan.isAdmin && !plan.isAdmin) {
        throw new PlanAdminToNonError(plan.name);
      }

      await deleteOldPlanIfNotInUse(oldPlan.planInstanceId, oldPlanIndex);

      const newPlan: PlanAttributes = {
        ...plan,
        planInstanceId: uuidv4(),
        status: PlanStatus.Published,
      };
      delete newPlan.osis;
      await db.push('/plans[]', newPlan);
      return res.json(plan);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('savePlan'));
    }
  }
);

export { router as publishPlanRouter };
