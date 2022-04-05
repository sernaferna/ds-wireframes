import express, { Request, Response, NextFunction } from 'express';
import { db } from '../../services/db';
import { getActionByIdInternal } from './byId';
import { body, param } from 'express-validator';
import { validateRequest, DatabaseError, CustomError, ActionsForDay } from '@devouringscripture/common';

export const internalMarkItemReadForDate = (actionDayId: string, actionId: string, actions: ActionsForDay) => {
  try {
    let indexOfDay = db.getIndex('/actions/entries', actionDayId);
    if (indexOfDay < 0) {
      db.push('/actions/entries[]', actions);
      indexOfDay = db.getIndex('/actions/entries', actionDayId);
    }

    let actionType = 'default';

    let indexOfItem = db.getIndex(`/actions/entries[${indexOfDay}]/${actionType}Actions`, actionId);
    if (indexOfItem < 0) {
      actionType = 'custom';
      indexOfItem = db.getIndex(`/actions/entries[${indexOfDay}]/${actionType}Actions`, actionId);
    }

    if (indexOfItem < 0) {
      throw new DatabaseError('markItemForDate');
    }

    let fieldValue = db.getObject<boolean>(
      `/actions/entries[${indexOfDay}]/${actionType}Actions[${indexOfItem}]/completed`
    );
    fieldValue = !fieldValue;
    db.push(`/actions/entries[${indexOfDay}]/${actionType}Actions[${indexOfItem}]/completed`, fieldValue);
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
    console.log(`Marking an item read/unread: ${actionId} for ${actionDayId}`);

    try {
      internalMarkItemReadForDate(actionDayId, actionId, actions);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      const error = new DatabaseError('markItemForDate');
      return next(error);
    }

    const updatedItem = getActionByIdInternal(req.params.actionDayId);
    res.send(updatedItem);
  }
);

export { router as markActionItemForDateRouter };
