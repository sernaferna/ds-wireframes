import { Request, Response, NextFunction } from 'express';

export const handleFourOhFour = (req: Request, res: Response, next: NextFunction) => {
  next(res.status(404).send('API not found'));
};
