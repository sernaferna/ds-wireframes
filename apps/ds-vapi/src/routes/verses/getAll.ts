import express, { Request, Response } from 'express';
import { getVersesByNum } from '../../services/db';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  console.log('Get all verses API called');

  getVersesByNum()
    .then((verses) => res.send(verses))
    .catch((err) => {
      res.status(500).send('error fetching data');
    });
});

export { router as getAllVersesRouter };
