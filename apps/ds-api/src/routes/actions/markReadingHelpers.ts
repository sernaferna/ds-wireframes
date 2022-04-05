import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { CustomError, DatabaseError, ActionsForDay, validateRequest } from '@devouringscripture/common';
import { getActionForDateInternal } from './getForDate';
import { internalMarkItemReadForDate } from './markItemForDate';

const markItemRead = (date: string, actionType: string) => {
  const actions: ActionsForDay = getActionForDateInternal(date);

  for (let i = 0; i < actions.defaultActions.length; i++) {
    if (actions.defaultActions[i].id === actionType) {
      actions.defaultActions[i].completed = true;
    }
  }

  internalMarkItemReadForDate(actions.id, actionType, actions);
};

const router = express.Router();

router.put(
  '/markPassageRead/:date/ot/short',
  [param('date').isDate().withMessage('Date required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const date = req.params.date;
    const actionType = 'actions|default|shortotpass';
    console.log(`Action to read short OT passage for ${date}`);

    try {
      markItemRead(date, actionType);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('Mark short OT passage read'));
    }

    res.send('done');
  }
);

router.put(
  '/markPassageRead/:date/ot/long',
  [param('date').isDate().withMessage('Date required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const date = req.params.date;
    const actionType = 'actions|default|rlotpass';
    console.log(`Action to read short OT passage for ${date}`);

    try {
      markItemRead(date, actionType);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('Mark short OT passage read'));
    }

    res.send('done');
  }
);

router.put(
  '/markPassageRead/:date/nt/short',
  [param('date').isDate().withMessage('Date required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const date = req.params.date;
    const actionType = 'actions|default|rsntpass';
    console.log(`Action to read short OT passage for ${date}`);

    try {
      markItemRead(date, actionType);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('Mark short OT passage read'));
    }

    res.send('done');
  }
);

router.put(
  '/markPassageRead/:date/nt/long',
  [param('date').isDate().withMessage('Date required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const date = req.params.date;
    const actionType = 'actions|default|rlntpass';
    console.log(`Action to read short OT passage for ${date}`);

    try {
      markItemRead(date, actionType);
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }

      return next(new DatabaseError('Mark short OT passage read'));
    }

    res.send('done');
  }
);

export { router as markReadingHelpersRouter };
