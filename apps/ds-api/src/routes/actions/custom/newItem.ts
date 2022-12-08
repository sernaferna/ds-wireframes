import express, { Request, Response, NextFunction } from 'express';
import { ActionType, validateRequest, DatabaseError } from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../services/db';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/',
  [body('displayName').notEmpty().withMessage('Must include display name')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const newBaseItem = req.body;
    const newItem: ActionType = {
      ...newBaseItem,
      id: uuidv4(),
    };

    try {
      await db.push('/actions/custom[]', newItem);
    } catch (err) {
      return next(new DatabaseError('newCustomAction'));
    }

    res.status(201).json(newItem);
  }
);

export { router as newCustomActionTypeRouter };
