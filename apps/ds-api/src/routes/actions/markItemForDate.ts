import express, { Request, Response, NextFunction } from 'express';
import { db } from '../../services/db';
import { getActionByIdInternal } from './byId';
import { body, param } from 'express-validator';
import { validateRequest, DatabaseError, CustomError, ActionsForDay } from '@devouringscripture/common';

export const internalMarkItemReadForDate = async (actionDayId: string, actionId: string, actions: ActionsForDay) => {
  try {
    let indexOfDay = await db.getIndex('/actions/entries', actionDayId);
    if (indexOfDay < 0) {
      await db.push('/actions/entries[]', actions);
      indexOfDay = await db.getIndex('/actions/entries', actionDayId);
    }

    let actionType = 'default';

    let indexOfItem = await db.getIndex(`/actions/entries[${indexOfDay}]/${actionType}Actions`, actionId);
    if (indexOfItem < 0) {
      actionType = 'custom';
      indexOfItem = await db.getIndex(`/actions/entries[${indexOfDay}]/${actionType}Actions`, actionId);
    }

    if (indexOfItem < 0) {
      throw new DatabaseError('markItemForDate');
    }

    let fieldValue = await db.getObject<boolean>(
      `/actions/entries[${indexOfDay}]/${actionType}Actions[${indexOfItem}]/completed`
    );
    fieldValue = !fieldValue;
    await db.push(`/actions/entries[${indexOfDay}]/${actionType}Actions[${indexOfItem}]/completed`, fieldValue);
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }

    throw new DatabaseError('markItemForDate');
  }
};

const router = express.Router();

router.put(
  '/:actionDayId/mark/:actionId',
  [
    param('actionDayId').isUUID().withMessage('Valid ID required'),
    param('actionId').notEmpty().withMessage('Valid Action ID required'),
    body('id').isUUID().withMessage('Must include valid ID'),
    body('date').isDate().withMessage('Must include valid date'),
    body('defaultActions').notEmpty().withMessage('Missing actions'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const actionDayId = req.params.actionDayId;
    const actionId = req.params.actionId;
    const actions: ActionsForDay = req.body;

    try {
      internalMarkItemReadForDate(actionDayId, actionId, actions);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const error = new DatabaseError('markItemForDate');
      return next(error);
    }

    const updatedItem = await getActionByIdInternal(req.params.actionDayId);
    res.json(updatedItem);
  }
);

export { router as markActionItemForDateRouter };
