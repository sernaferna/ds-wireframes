import express, { Request, Response } from 'express';
import { UserAttributes } from '../../dm/UserItems';
import { db } from '../../services/db';
import { generateDefaultUser } from '../../helpers/UserHelpers';
import { param } from 'express-validator';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

router.get(
  '/:userId',
  [param('userId').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(`getUser called for ${req.params.userId}`);

    let user: UserAttributes | null = null;

    try {
      const index = db.getIndex('/users', req.params.userId);
      user = db.getData(`/users[${index}]`);
    } catch (err) {
      if (req.params.userId === '2f740108-8596-4a8a-b334-518ab34a8c50') {
        user = generateDefaultUser();
        db.push('/users[]', user);
      } else {
        res.status(404).send('user not found');
      }
    }

    res.send(user);
  }
);

export { router as getUserByIdRouter };
