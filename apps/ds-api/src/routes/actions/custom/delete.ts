import express, { Request, Response } from 'express';
import { db } from '../../../services/db';
import { param } from 'express-validator';
import { validateRequest } from '@devouringscripture/common';

const router = express.Router();

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`Delete custom action called for ${req.params.id}`);

    try {
      const indexOfItem = db.getIndex('/actions/custom', req.params.id);
      db.delete(`/actions/custom[${indexOfItem}]`);
      res.status(200).send('Item deleted');
    } catch (err) {
      res.status(500).send('Error deleting item');
    }
  }
);

export { router as deleteCustomActionRouter };
