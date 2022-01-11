import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { validateRequest, Passage, NotFoundError, CustomError, DatabaseError } from '@devouringscripture/common';
import { db } from '../../../services/db';

const router = express.Router();

router.get(
  '/:id',
  [param('id').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Get passage by ID ${req.params.id}`);

    try {
      const index: number = db.getIndex('/passages', req.params.id);
      if (index < 0) {
        throw new NotFoundError('Passage by ID');
      }
      const response: Passage = db.getObject<Passage>(`/passages[${index}]`);
      res.send(response);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('getPassageByID'));
    }
  }
);

export { router as getPassageByIdRouter };
