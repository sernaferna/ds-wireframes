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
  InstantiatedPlan,
} from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';
import { basePlanValidationRules } from '../../helpers/planValidationRules';
import { db } from '../../services/db';

export const deleteOldPlanIfNotInUse = (instanceId: string, indexInDB: number) => {
  try {
    const instantiated = db.getObject<InstantiatedPlan[]>('/instantiatedPlans');
    let inUse = false;
    for (const ip of instantiated) {
      if (ip.planInstanceId === instanceId) {
        inUse = true;
      }
    }
    if (!inUse) {
      db.push(`/plans[${indexInDB}]/status`, PlanStatus.Deleted);
    }
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }

    throw new DatabaseError('Save Plan fetching instantiated plans');
  }
};

const router = express.Router();

router.post(
  '/save',
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

      if (plan.status === PlanStatus.Unsaved) {
        plan.status = PlanStatus.Saved;
        db.push('/plans[]', plan);
        return res.status(201).json(plan);
      }

      if (plan.status === PlanStatus.Saved) {
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
        db.push(`/plans[${oldIndex}]/osis`, plan.osis);
        db.push(`/plans[${oldIndex}]/isFreeform`, plan.isFreeform);
        db.push(`/plans[${oldIndex}]/status`, plan.status);
        db.push(`/plans[${oldIndex}]/version`, plan.version);
        db.push(`/plans[${oldIndex}]/days`, plan.days);
        return res.json(plan);
      }

      if (plan.status === PlanStatus.Deleted) {
        throw new InvalidPlanStatusError(plan.status, PlanStatus.Saved);
      }

      //anything else means published
      const oldPlanIndex = db.getIndex('/plans', plan.planInstanceId, 'planInstanceId');
      if (oldPlanIndex < 0) {
        throw new InvalidPlanError('Plan not found');
      }
      const oldPlan = db.getObject<PlanAttributes>(`/plans[${oldPlanIndex}]`);
      if (!v2GTV1(plan.version, oldPlan.version)) {
        throw new PlanVersionError(plan.version);
      }

      deleteOldPlanIfNotInUse(plan.planInstanceId, oldPlanIndex);

      const newPlan: PlanAttributes = {
        ...plan,
        planInstanceId: uuidv4(),
        status: PlanStatus.Saved,
        days: plan.days,
      };
      db.push('/plans[]', newPlan);
      return res.json(newPlan);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('savePlan'));
    }
  }
);

export { router as savePlanRouter };
