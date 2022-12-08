import express, { Request, Response } from 'express';
import { db } from '../../services/db';
import { UserAttributes, validateRequest } from '@devouringscripture/common';
import { param } from 'express-validator';
import { userValidationRules } from '../../helpers/userValidationRules';

const router = express.Router();

router.put(
  '/:userId',
  [param('userId').isUUID().withMessage('Valid ID required')],
  userValidationRules(),
  validateRequest,
  async (req: Request, res: Response) => {
    const newUser: UserAttributes = req.body as UserAttributes;

    await db.delete('/users[0]');
    await db.push('/users[]', newUser);

    res.json(newUser);
  }
);

export { router as updateUserRouter };
