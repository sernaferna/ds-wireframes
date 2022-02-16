import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { validateRequest, CustomError, DatabaseError, NotFoundError } from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.delete(
  '/:ipId',
  [param('ipId').isUUID().withMessage('Instantiated Plan ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const ipId: string = req.params.ipId;
    console.log(`Deleting instantiated plan ${ipId}`);

    try {
      const planIndex = db.getIndex(`/instantiatedPlans`, ipId);
      if (planIndex < 0) {
        throw new NotFoundError(`Plan ${ipId}`);
      }

      db.delete(`/instantiatedPlans[${planIndex}]`);
      res.send('item removed');
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const dbErr = new DatabaseError('error deleting instantiated plan');
      return next(dbErr);
    }
  }
);

export { router as deleteInstantiatedPlanRouter };
