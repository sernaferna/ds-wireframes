import { Request, Response, NextFunction } from 'express';

export const handleFourOhFour = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('API not found');
};
