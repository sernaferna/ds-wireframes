import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { db } from '../../services/db';
import { ActionsForDay, validateRequest, DatabaseError } from '@devouringscripture/common';
import { DateTime } from 'luxon';

const router = express.Router();

router.get(
  '/forMonth/:year/:month',
  [
    param('year').isInt().withMessage('Must supply valid year'),
    param('month').isInt({ min: 1, max: 12 }).withMessage('Must provide valid month'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const passedMonth = DateTime.fromISO(`${req.params.year}-${req.params.month}-01`);
    const prevMonth = passedMonth.minus({ month: 1 });
    const nextMonth = passedMonth.plus({ month: 1 });

    try {
      const fullList = db.getObject<ActionsForDay[]>('/actions/entries');
      const filteredList = fullList.filter((item) => {
        const itemDate = DateTime.fromISO(item.date);
        return (
          itemDate.hasSame(prevMonth, 'month') ||
          itemDate.hasSame(passedMonth, 'month') ||
          itemDate.hasSame(nextMonth, 'month')
        );
      });

      res.json(filteredList);
    } catch (err) {
      const error = new DatabaseError('getActionsForMonth');
      return next(error);
    }
  }
);

export { router as getActionsForMonthRouter };
