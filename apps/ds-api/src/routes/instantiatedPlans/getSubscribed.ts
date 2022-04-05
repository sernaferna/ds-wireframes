import express, { Request, Response, NextFunction } from 'express';
import { InstantiatedPlan, CustomError, DatabaseError } from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.get('/subscribed', async (req: Request, res: Response, next: NextFunction) => {
  console.log('Get all subscribed plans');

  try {
    const plans = db.getObject<InstantiatedPlan[]>('/instantiatedPlans');
    res.send(plans);
  } catch (err) {
    if (err instanceof CustomError) {
      return next(err);
    }

    return next(new DatabaseError('Get All Subscribed Plans'));
  }
});

export { router as getSubscribedIPRouter };
