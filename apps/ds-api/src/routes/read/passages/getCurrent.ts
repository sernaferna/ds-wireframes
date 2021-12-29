import express, { Request, Response } from 'express';
import { PassageItems } from '@devouringscripture/common';
import { db } from '../../../services/db';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  console.log('getAll current passage items called');

  let response;
  try {
    response = db.getObject<PassageItems>('/passages');
  } catch (err) {
    response = [];
  }

  res.send(response);
});

export { router as getCurrentlyReadingPassages };
