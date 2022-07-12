import express, { Request, Response } from 'express';
import { db } from '../../services/db';
import { ActionsForDay } from '@devouringscripture/common';
import { generateActionBacklog } from '../../helpers/ActionHelpers';

const router = express.Router();

router.get('/recent', async (req: Request, res: Response) => {
  let response;

  try {
    response = db.getObject<ActionsForDay[]>('/actions/entries');
  } catch (err) {
    response = generateActionBacklog();
    db.push('/actions/entries', response);
  }

  res.json(response);
});

export { router as getRecentActionsRouter };
