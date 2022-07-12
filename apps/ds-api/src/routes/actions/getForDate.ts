import express, { Request, Response } from 'express';
import { db } from '../../services/db';
import { ActionsForDay, validateRequest } from '@devouringscripture/common';
import { populateActionsForDay } from '../../helpers/ActionHelpers';
import { param } from 'express-validator';

const router = express.Router();

export const getActionForDateInternal = (actionDate: string): ActionsForDay => {
  let response;

  try {
    const itemIndex = db.getIndex('/actions/entries', actionDate, 'date');

    if (itemIndex >= 0) {
      response = db.getObject<ActionsForDay>(`/actions/entries[${itemIndex}]`);
    } else {
      response = populateActionsForDay(actionDate);
    }
  } catch (err) {
    response = populateActionsForDay(actionDate);
  }

  return response;
};

router.get(
  '/byDate/:actionDate',
  [param('actionDate').isDate().withMessage('Valid date required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const response = getActionForDateInternal(req.params.actionDate);

    res.json(response);
  }
);

export { router as getActionForDateRouter };
