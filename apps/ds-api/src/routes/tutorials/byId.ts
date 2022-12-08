import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { validateRequest, NotFoundError, CustomError, DatabaseError, Tutorial } from '@devouringscripture/common';
import { db } from '../../services/db';

const router = express.Router();

router.get(
  '/:tutorialId',
  [param('tutorialId').isInt().withMessage('Tutorial ID Missing')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const tutorialId = req.params.tutorialId;

    try {
      const index = await db.getIndex('/tutorials', tutorialId);
      if (index < 0) {
        throw new NotFoundError(`Tutorial ${tutorialId}`);
      }

      const tutorial = await db.getObject<Tutorial>(`/tutorials[${index}]`);
      res.json(tutorial);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('getTutorialById'));
    }
  }
);

export { router as getTutorialByIdRouter };
