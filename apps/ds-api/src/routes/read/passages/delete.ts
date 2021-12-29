import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { validateRequest } from '../../../middleware/validateRequest';
import { db } from '../../../services/db';

const router = express.Router();

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('ID required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`Delete current read item with id ${req.params.id}`);

    try {
      const indexOfItem = db.getIndex('/passages', req.params.id);
      db.delete(`/passages[${indexOfItem}]`);
      res.send('Item removed');
    } catch (err) {
      res.status(500).send('Error removing item');
    }
  }
);

export { router as deleteCurrentReadItem };
