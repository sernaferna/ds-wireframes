import express, { Request, Response } from 'express';
import { notesDB } from '../../services/notes-db';
import { Note } from '@devouringscripture/common';
import { param } from 'express-validator';
import { validateRequest } from '@devouringscripture/common';

const router = express.Router();

router.get(
  '/from/:lowerBound/to/:upperBound',
  [
    param('lowerBound').isInt({ min: 1, max: 40000 }).withMessage('Lower bound must be numeric'),
    param('upperBound').isInt({ min: 1, max: 40000 }).withMessage('Upper bound must be numeric'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const lowerBound: number = parseInt(req.params.lowerBound as string, 10);
    const upperBound: number = parseInt(req.params.upperBound as string, 10);

    try {
      const allResults = await notesDB.getObject<Note[]>('/notes');
      const response = allResults.filter((item) => {
        return item.passageStart >= lowerBound && item.passageEnd <= upperBound;
      });
      res.json(response);
    } catch (err) {
      res.json([]);
    }
  }
);

export { router as getAllNotesInRangeRouter };
