import express, { Request, Response } from 'express';
import { PlanAttributes } from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  console.log('getAll Plans called');

  try {
    const publicPlans: PlanAttributes[] = db.getObject<PlanAttributes[]>('/plans');
    const userPlans: PlanAttributes[] = db.getObject<PlanAttributes[]>(`/plans/custom`);
    const response: PlanAttributes[] = userPlans.concat(publicPlans);
    res.send(response);
  } catch (err) {
    res.send([]);
  }
});

export { router as getAllPlansRouter };
