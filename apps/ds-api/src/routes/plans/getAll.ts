import express, { Request, Response } from 'express';
import { PlanAttributes } from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const publicPlans: PlanAttributes[] = db.getObject<PlanAttributes[]>('/plans');
    res.json(publicPlans);
  } catch (err) {
    res.json([]);
  }
});

export { router as getAllPublicPlansRouter };
