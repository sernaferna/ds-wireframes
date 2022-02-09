import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { validateRequest, NotFoundError, CustomError, DatabaseError } from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Delete plan called for ${req.params.id}`);

    try {
      const index = db.getIndex(`/plans/custom`, req.params.id);
      if (index < 0) {
        throw new NotFoundError(`Plan not found: ${req.params.id}`);
      }
      db.delete(`/plans/custom[${index}]`);
      res.send('Item removed');
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const error = new DatabaseError('deletePlan');
      return next(error);
    }
  }
);

export { router as deletePlanRouter };
