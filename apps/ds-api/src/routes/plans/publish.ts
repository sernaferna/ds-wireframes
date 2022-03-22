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
} from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';
import { basePlanValidationRules } from '../../helpers/planValidationRules';
import { db } from '../../services/db';

const router = express.Router();

router.post(
  '/publish',
  basePlanValidationRules(),
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('Publishing plan', req.body.name);

    try {
      let plan: PlanAttributes;
      try {
        if (req.body.planInstanceId) {
          plan = req.body;
          console.log('got PlanAttributes from body');
        } else {
          const basePlan: BasePlanAttributes = req.body;
          plan = {
            ...basePlan,
            planInstanceId: uuidv4(),
            planId: uuidv4(),
            status: PlanStatus.Unsaved,
          };
          console.log('got BasePlanAttributes from body');
        }
      } catch (err) {
        console.error("Couldn't get plan from body");
        throw new InvalidPlanError(`Name: ${req.body.name || ''}; description: ${req.body.description || ''}`);
      }

      const numExpectedDays = plan.length * (plan.includeWeekends ? 7 : 5);
      if (!plan.days || plan.days.length !== numExpectedDays) {
        console.error('Invalid # of weeks');
        throw new InvalidPlanError("Week/day data doesn't match length attribute");
      }

      const invalidDays = plan.days.filter((day) => !isReferenceValid(day.osis));
      if (invalidDays.length > 0) {
        throw new InvalidPlanDaysError(plan.days);
      }

      if (plan.status === PlanStatus.Unsaved) {
        plan.status = PlanStatus.Published;
        db.push('/plans[]', plan);
        console.log('brand new plan saved');
        return res.status(201).send(plan);
      }

      if (plan.status === PlanStatus.Saved) {
        plan.status = PlanStatus.Published;
        const oldIndex = db.getIndex('/plans', plan.planInstanceId, 'planInstanceId');
        if (oldIndex < 0) {
          throw new InvalidPlanError('Plan not found');
        }
        db.push(`/plans[${oldIndex}]/name`, plan.name);
        db.push(`/plans[${oldIndex}]/description`, plan.description);
        db.push(`/plans[${oldIndex}]/includeWeekends`, plan.includeWeekends);
        db.push(`/plans[${oldIndex}]/includesApocrypha`, plan.includesApocrypha);
        db.push(`/plans[${oldIndex}]/isAdmin`, plan.isAdmin);
        db.push(`/plans[${oldIndex}]/length`, plan.length);
        // db.push(`/plans[${oldIndex}]/osis`, plan.osis); // can save OSIS, but not Publish
        db.push(`/plans[${oldIndex}]/status`, plan.status);
        db.push(`/plans[${oldIndex}]/version`, plan.version);
        db.push(`/plans[${oldIndex}]/days`, plan.days);
        console.log('plan updated');
        return res.send(plan);
      }

      if (plan.status === PlanStatus.Deleted) {
        console.error('plan was already deleted');
        throw new InvalidPlanStatusError(plan.status, PlanStatus.Saved);
      }

      //anything else means published
      const oldPlanIndex = db.getIndex('/plans', plan.planInstanceId, 'planInstanceId');
      if (oldPlanIndex < 0) {
        console.error("plan wasn't found in db");
        throw new InvalidPlanError('Plan not found');
      }
      const oldPlan = db.getObject<PlanAttributes>(`/plans[${oldPlanIndex}]`);
      if (!v2GTV1(plan.version, oldPlan.version)) {
        console.error('invalid version');
        throw new PlanVersionError(plan.version);
      }

      db.push(`/plans[${oldPlanIndex}]/status`, PlanStatus.Deleted);
      const newPlan: PlanAttributes = {
        ...plan,
        planInstanceId: uuidv4(),
        status: PlanStatus.Published,
      };
      delete newPlan.osis;
      db.push('/plans[]', newPlan);
      console.log('plan re-published');
      return res.send(plan);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('savePlan'));
    }
  }
);

export { router as publishPlanRouter };
