import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { validateRequest } from '../../middleware/validateRequest';
import { db } from '../../services/db';
import { ActionsForDay } from '@devouringscripture/common/src/dm/Action';
import { DateTime } from 'luxon';

const router = express.Router();

router.get(
  '/forMonth/:year/:month',
  [
    param('year').isInt().withMessage('Must supply valid year'),
    param('month').isInt({ min: 1, max: 12 }).withMessage('Must provide valid month'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`Calling getActionsForMonth for ${req.params.year}/${req.params.month}`);
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

      res.send(filteredList);
    } catch (err) {
      res.status(500).send('Error processing request');
    }
  }
);

export { router as getActionsForMonthRouter };
