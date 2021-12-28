import express, { Request, Response } from 'express';
import { ActionsForDay } from '@devouringscripture/common';
import { db } from '../../services/db';
import { param } from 'express-validator';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

export const getActionByIdInternal = (id: string): ActionsForDay => {
  const itemIndex = db.getIndex('/actions/entries', id);
  const response = db.getObject<ActionsForDay>(`/actions/entries[${itemIndex}]`);

  return response;
};

router.get(
  '/:actionDayId',
  [param('actionDayID').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`Getting action id ${req.params.actionDayId}`);

    try {
      const response: ActionsForDay = getActionByIdInternal(req.params.actionDayId);
      res.send(response);
    } catch (err) {
      res.status(404).send('item not found');
    }
  }
);

export { router as getActionByIdRouter };
