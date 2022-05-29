import express, { Request, Response, NextFunction } from 'express';
import { db } from '../../../services/db';
import { param } from 'express-validator';
import { validateRequest, NotFoundError, DatabaseError, CustomError } from '@devouringscripture/common';

const router = express.Router();

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const indexOfItem = db.getIndex('/actions/custom', req.params.id);
      if (indexOfItem < 0) {
        throw new NotFoundError('custom action');
      }
      db.delete(`/actions/custom[${indexOfItem}]`);
      res.status(200).send('Item deleted');
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('deleteCustomAction'));
    }
  }
);

export { router as deleteCustomActionRouter };
