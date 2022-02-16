import express, { Request, Response, NextFunction } from 'express';
import {
  PlanAttributes,
  CustomError,
  DatabaseError,
  InstantiatedPlan,
  BaseInstantiatedPlan,
} from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log(`get all instantiated plans`);

  try {
    const instantiatedPlans: InstantiatedPlan[] = db.getObject<InstantiatedPlan[]>(`/instantiatedPlans`);

    const returnArray: BaseInstantiatedPlan[] = instantiatedPlans.slice();

    const publicPlans: PlanAttributes[] = db.getObject<PlanAttributes[]>('/plans');
    for (const plan of publicPlans) {
      if (instantiatedPlans.filter((p) => p.planInstanceId === plan.planInstanceId).length < 1) {
        const newItem: BaseInstantiatedPlan = { planInstanceId: plan.planInstanceId };
        returnArray.push(newItem);
      }
    }

    res.send(returnArray);
  } catch (err) {
    if (err instanceof CustomError) {
      return next(err);
    }

    const dbErr = new DatabaseError('get all instantiated plans');
    return next(dbErr);
  }
});

export { router as getAllInstantiatedPlansRouter };
