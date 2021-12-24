import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../../middleware/validateRequest';

const router = express.Router();

router.post('/', [body('')], validateRequest, async (req: Request, res: Response) => {});

export { router as newReadingPlan };
