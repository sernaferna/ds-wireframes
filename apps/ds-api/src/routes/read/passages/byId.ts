import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { validateRequest, Passage } from '@devouringscripture/common';
import { db } from '../../../services/db';

const router = express.Router();

router.get(
  '/:id',
  [param('id').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`Get passage by ID ${req.params.id}`);

    try {
      const index: number = db.getIndex('/passages', req.params.id);
      const response: Passage = db.getObject<Passage>(`/passages[${index}]`);
      res.send(response);
    } catch (err) {
      res.status(404).send('Item not found');
    }
  }
);

export { router as getPassageByIdRouter };
