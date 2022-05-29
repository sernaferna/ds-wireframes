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
 * @param apiDetails The API being called, if applicable
 * @param duration The duration in milliseconds (if applicable)
 * @param type Type of log (error, warning, or info)
 * @param objToLog Additional object to log (if any)
 */
export const writeLog = (
  event: string,
  apiDetails?: { method: string; path: string },
  duration?: number,
  type: 'INFO' | 'ERROR' | 'WARN' = 'INFO',
  objToLog?: any
) => {
  const obj: any = {
    app: process.env.npm_package_name,
    event,
    apiDetails,
    duration,
    objToLog,
  };

  switch (type) {
    case 'INFO':
      console.log(JSON.stringify(obj));
      break;
    case 'ERROR':
      console.error(JSON.stringify(obj));
      break;
    case 'WARN':
      console.warn(JSON.stringify(obj));
  }
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

  writeLog('START', { method, path });

  res.on('close', () => {
    const durInMillis = getDurationInMillis(start);
    writeLog('END', { method, path }, durInMillis);
  });

  next();
};
