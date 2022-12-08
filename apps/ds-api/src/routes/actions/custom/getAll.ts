import express, { Request, Response } from 'express';
import { db } from '../../../services/db';
import { ActionType } from '@devouringscripture/common';
import { defaultCustomActions } from '../../../helpers/ActionHelpers';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let response;

  try {
    response = await db.getObject<ActionType[]>('/actions/custom');
  } catch (err) {
    response = defaultCustomActions;
    await db.push('/actions/custom', response);
  }

  res.json(response);
});

export { router as getAllCustomActionsRouter };
