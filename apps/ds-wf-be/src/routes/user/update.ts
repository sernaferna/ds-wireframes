import express, { Request, Response } from 'express';
import { db } from '../../services/db';
import { UserAttributes } from '../../dm/UserItems';
import { body, param } from 'express-validator';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

router.put(
  '/:userId',
  [
    param('userId').isUUID().withMessage('Valid ID required'),
    body('signupDate').isDate().withMessage('Signup date required'),
    body('id').isUUID().withMessage('Valid ID required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const user: UserAttributes = req.body as UserAttributes;
    console.log(`updateUser called for ${user.id}`);

    //very much a hack, but this db is only ever going to store one user
    db.delete('/users[0]');
    db.push('/users[]', user);

    res.send(user);
  }
);

export { router as updateUserRouter };
