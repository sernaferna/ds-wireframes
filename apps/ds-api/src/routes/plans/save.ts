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

export const deleteOldPlanIfNotInUse = async (instanceId: string, indexInDB: number) => {
  try {
    const instantiated = await db.getObject<InstantiatedPlan[]>('/instantiatedPlans');
    let inUse = false;
    for (const ip of instantiated) {
      if (ip.planInstanceId === instanceId) {
        inUse = true;
      }
    }
    if (!inUse) {
      await db.push(`/plans[${indexInDB}]/status`, PlanStatus.Deleted);
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
        await db.push('/plans[]', plan);
        return res.status(201).json(plan);
      }

      if (plan.status === PlanStatus.Saved) {
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
        await db.push(`/plans[${oldIndex}]/osis`, plan.osis);
        await db.push(`/plans[${oldIndex}]/isFreeform`, plan.isFreeform);
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

      await deleteOldPlanIfNotInUse(plan.planInstanceId, oldPlanIndex);

      const newPlan: PlanAttributes = {
        ...plan,
        planInstanceId: uuidv4(),
        status: PlanStatus.Saved,
        days: plan.days,
      };
      await db.push('/plans[]', newPlan);
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
