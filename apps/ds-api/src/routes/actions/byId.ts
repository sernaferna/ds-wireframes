import express, { Request, Response, NextFunction } from 'express';
import { ActionsForDay, NotFoundError } from '@devouringscripture/common';
import { db } from '../../services/db';
import { param } from 'express-validator';
import { validateRequest } from '@devouringscripture/common';

const router = express.Router();

export const getActionByIdInternal = (id: string): ActionsForDay => {
  const itemIndex = db.getIndex('/actions/entries', id);
  const response = db.getObject<ActionsForDay>(`/actions/entries[${itemIndex}]`);

  return response;
};

router.get(
  '/:actionDayId',
  [param('actionDayID').isUUID(4).withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Getting action id ${req.params.actionDayId}`);

    try {
      const response: ActionsForDay = getActionByIdInternal(req.params.actionDayId);
      res.send(response);
    } catch (err) {
      const error = new NotFoundError('Action');
      return next(error);
    }
  }
);

export { router as getActionByIdRouter };
