import express, { Request, Response } from 'express';
import { query } from 'express-validator';
import { validateRequest } from '../../middleware/validateRequest';
import { db } from '../../services/db';
import { ActionStats, ActionsForDay } from '@devouringscripture/common';
import { DateTime } from 'luxon';

const router = express.Router();

router.get(
  '/stats',
  [query('tf').isIn(['week', '2weeks', 'month', 'year', 'alltime', undefined]).withMessage('Invalid param')],
  validateRequest,
  async (req: Request, res: Response) => {
    const timeframe = req.query.tf || 'alltime';
    console.log(`get action stats called for ${timeframe}`);

    const stats: ActionStats = {
      dataSize: 0,
      readLongNT: 0,
      readLongOT: 0,
      readShortNT: 0,
      readShortOT: 0,
      readScripture: 0,
      journaled: 0,
      prayed: 0,
      created: 0,
      conversed: 0,
    };

    try {
      let earliestDate: DateTime | undefined;
      switch (timeframe) {
        case 'week':
          earliestDate = DateTime.now().minus({ week: 1 });
          break;
        case '2weeks':
          earliestDate = DateTime.now().minus({ week: 2 });
          break;
        case 'month':
          earliestDate = DateTime.now().minus({ month: 1 });
          break;
        case 'year':
          earliestDate = DateTime.now().minus({ year: 1 });
          break;
        case 'alltime':
          earliestDate = DateTime.fromISO('1900-01-01');
          break;
      }
      const response = db.getObject<ActionsForDay[]>('/actions/entries');
      response.forEach((item) => {
        const itemDate = DateTime.fromISO(item.date);
        if (itemDate < earliestDate!) {
          return;
        }

        stats.dataSize++;

        let readScripture = false;
        item.defaultActions.forEach((a) => {
          if (a.id === 'actions|default|converse' && a.completed) {
            stats.conversed++;
          }
          if (a.id === 'actions|default|create' && a.completed) {
            stats.created++;
          }
          if (a.id === 'actions|default|pray' && a.completed) {
            stats.prayed++;
          }
          if (a.id === 'actions|default|journ' && a.completed) {
            stats.journaled++;
          }
          if (a.id === 'actions|default|rlntpass' && a.completed) {
            stats.readLongNT++;
            readScripture = true;
          }
          if (a.id === 'actions|default|rlotpass' && a.completed) {
            stats.readLongOT++;
            readScripture = true;
          }
          if (a.id === 'actions|default|rsntpass' && a.completed) {
            stats.readShortNT++;
            readScripture = true;
          }
          if (a.id === 'actions|default|shortotpass' && a.completed) {
            stats.readShortOT++;
            readScripture = true;
          }
        });

        if (readScripture) {
          stats.readScripture++;
        }
      });

      res.send(stats);
    } catch (err) {
      res.status(500).send('Error retrieving data');
    }
  }
);

export { router as getActionStatsRouter };
