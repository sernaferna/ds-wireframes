import express, { Request, Response } from 'express';
import { ActionType } from '@devouringscripture/common/src/dm/Action';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../services/db';
import { body } from 'express-validator';
import { validateRequest } from '../../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/',
  [body('displayName').notEmpty().withMessage('Must include display name')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`create custom action type called with ${req.body.displayName}`);

    const newBaseItem = req.body;
    const newItem: ActionType = {
      ...newBaseItem,
      id: uuidv4(),
    };

    try {
      db.push('/actions/custom[]', newItem);
    } catch (err) {
      res.status(500).send('Error receiving item');
    }

    res.send(newItem);
  }
);

export { router as newCustomActionTypeRouter };
