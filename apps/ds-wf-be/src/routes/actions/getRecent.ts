import express, { Request, Response } from 'express';
import { db } from '../../services/db';
import { ActionsForDay } from '../../dm/Action';
import { generateActionBacklog } from '../../helpers/ActionHelpers';

const router = express.Router();

router.get('/recent', async (req: Request, res: Response) => {
  console.log('Called get recent actions router');

  let response;
  try {
    response = db.getObject<ActionsForDay[]>('/actions/entries');
  } catch (err) {
    response = generateActionBacklog();
    db.push('/actions/entries', response);
  }

  res.send(response);
});

export { router as getRecentActionsRouter };
