import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validateRequest, DatabaseError } from '@devouringscripture/common';
import { BasePlanAttributes, PlanAttributes } from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../services/db';

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name required'),
    body('description').notEmpty().withMessage('Description required'),
    body('length').isInt({ min: 1 }).withMessage('Length required'),
    body('isAdmin').isBoolean().withMessage('Must indicate if is admin'),
    body('includesApocrypha').isBoolean().withMessage('Must indicate if includes apocrypha'),
    body('includesWeekends').isBoolean().withMessage('Must indicate if includes weekends'),
    body('version').matches('\\d.\\d').withMessage('Must include version number'),
    body('osis').notEmpty().withMessage('Must include OSIS string'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newBaseItem: BasePlanAttributes = req.body;
      console.log(`Creating new plan named ${newBaseItem.name}`);
      const newItem: PlanAttributes = {
        ...newBaseItem,
        id: uuidv4(),
      };
      db.push('/plans/custom', newItem);
      res.status(201).send(newItem);
    } catch (err) {
      const error = new DatabaseError('newPlan');
      return next(error);
    }
  }
);

export { router as newReadingPlan };
