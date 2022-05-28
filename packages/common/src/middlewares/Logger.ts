import { Request, Response, NextFunction } from 'express';

/**
 * Helper function to get a duration in milliseconds, from the start
 * time to now.
 *
 * @param start The start time, in Process HR Time format
 * @returns Number of milliseconds (the diff between hrt and now)
 */
const getDurationInMillis = (start: [number, number]) => {
  const nsPerSec = 100;
  const nsToMS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * nsPerSec + diff[1]) / nsToMS;
};

/**
 * Helper function to write out a log in JSON format.
 *
 * @param event The event being logged
 * @param method The HTTP method called
 * @param path The Path of the API
 * @param duration The duration in milliseconds (if applicable)
 */
const writeLog = (event: string, method: string, path: string, duration?: number) => {
  const obj: any = {
    event,
    method,
    path,
    duration,
  };

  console.log(JSON.stringify(obj));
};

/**
 * Middleware to log the start and end of API calls in JSON format.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export const logAPICall = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();
  const method = req.method;
  const path = req.path;

  writeLog('START', method, path);

  res.on('close', () => {
    const durInMillis = getDurationInMillis(start);
    writeLog('END', method, path, durInMillis);
  });

  next();
};
