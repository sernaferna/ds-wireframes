import express, { Request, Response } from 'express';
import { getAllVerses } from '../../services/db';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  getAllVerses()
    .then((verses) => res.send(verses))
    .catch((err) => {
      res.status(500).send('error fetching data');
    });
});

export { router as getAllVersesRouter };
