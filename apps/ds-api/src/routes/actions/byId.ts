import express, { Request, Response, NextFunction } from 'express';
import { ActionsForDay, NotFoundError } from '@devouringscripture/common';
import { db } from '../../services/db';
import { param } from 'express-validator';
import { validateRequest } from '@devouringscripture/common';

const router = express.Router();

export const getActionByIdInternal = async (id: string): Promise<ActionsForDay> => {
  const itemIndex = await db.getIndex('/actions/entries', id);
  const response = await db.getObject<ActionsForDay>(`/actions/entries[${itemIndex}]`);

  return response;
};

router.get(
  '/:actionDayId',
  [param('actionDayID').isUUID(4).withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response: ActionsForDay = await getActionByIdInternal(req.params.actionDayId);
      res.json(response);
    } catch (err) {
      const error = new NotFoundError('Action');
      return next(error);
    }
  }
);

export { router as getActionByIdRouter };
