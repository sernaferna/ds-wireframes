import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { validateRequest } from '@devouringscripture/common';
import { getVersesByNum } from '../../services/db';

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
    console.log(`Get verse range api called from ${lowerBound} to ${upperBound}`);

    getVersesByNum(lowerBound, upperBound)
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send('Error retrieving verses'));
  }
);

export { router as getRangeOfVersesRouter };