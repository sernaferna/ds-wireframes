import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { validateRequest } from '../../middleware/validateRequest';
import { db } from '../../services/db';

const router = express.Router();

router.delete(
  '/:id',
  [param('id').isUUID().withMessage('ID required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`delete prayer item called with ${req.params.id}`);

    try {
      const indexOfItem = db.getIndex('/prayerItems', req.params.id);
      db.delete(`/prayerItems[${indexOfItem}]`);
      res.send('Item removed');
    } catch (err) {
      res.status(500).send('Error removing item');
    }
  }
);

export { router as deletePrayerItemRouter };
