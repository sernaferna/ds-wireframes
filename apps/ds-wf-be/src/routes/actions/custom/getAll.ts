import express, { Request, Response } from 'express';
import { db } from '../../../services/db';
import { ActionType } from '../../../dm/Action';
import { defaultCustomActions } from '../../../dm/Action';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  console.log('Get all custom actions called');

  let response;
  try {
    response = db.getObject<ActionType[]>('/actions/custom');
  } catch (err) {
    response = defaultCustomActions;
    db.push('/actions/custom', response);
  }

  res.send(response);
});

export { router as getAllCustomActionsRouter };
