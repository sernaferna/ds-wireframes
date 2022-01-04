import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { validateRequest, NotFoundError, DatabaseError, CustomError } from '@devouringscripture/common';
import { db } from '../../../services/db';

const router = express.Router();

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Delete current read item with id ${req.params.id}`);

    try {
      const indexOfItem = db.getIndex('/passages', req.params.id);
      if (indexOfItem < 0) {
        throw new NotFoundError('Passage item');
      }
      db.delete(`/passages[${indexOfItem}]`);
      res.send('Item removed');
    } catch (err) {
      return next(err instanceof CustomError ? err : new DatabaseError('deletePassage'));
    }
  }
);

export { router as deleteCurrentReadItem };
