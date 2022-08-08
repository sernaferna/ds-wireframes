import express, { Request, Response, NextFunction } from 'express';
import { param, body } from 'express-validator';
import { CustomError, DatabaseError, NotFoundError, Tutorial, validateRequest } from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.put(
  '/:id',
  [
    param('id').notEmpty().withMessage('ID required'),
    body('id').notEmpty().withMessage('ID required'),
    body('chapters').isArray().withMessage('Chapters required'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newTut: Tutorial = req.body;

      const index = db.getIndex('/tutorials', newTut.id);
      if (index < 0) {
        throw new NotFoundError(`Tutorial ${newTut.id}`);
      }

      db.delete(`/tutorials[${index}]`);
      db.push('/tutorials[]', newTut);

      res.json(newTut);
    } catch (err) {
      return next(err instanceof CustomError ? err : new DatabaseError('updateTutorial'));
    }
  }
);

export { router as updateTutorialRouter };
