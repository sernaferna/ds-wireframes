import express, { Request, Response, NextFunction } from 'express';
import { db } from '../../services/db';
import { CustomError, DatabaseError, NotFoundError, Tutorial } from '@devouringscripture/common';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fullList = await db.getObject<Tutorial[]>('/tutorials');
    if (!fullList || fullList.length < 1) {
      throw new NotFoundError('Tutorials');
    }

    const response = fullList.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    res.json(response);
  } catch (err) {
    return next(err instanceof CustomError ? err : new DatabaseError('getAllTutorials'));
  }
});

export { router as getAllTutorialsRouter };
