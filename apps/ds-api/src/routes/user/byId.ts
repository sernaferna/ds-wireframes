import express, { Request, Response, NextFunction } from 'express';
import { UserAttributes, validateRequest, UserNotFoundError } from '@devouringscripture/common';
import { db } from '../../services/db';
import { generateDefaultUser } from '../../helpers/UserHelpers';
import { param } from 'express-validator';

const router = express.Router();

router.get(
  '/:userId',
  [param('userId').isUUID().withMessage('Valid ID required')],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.userId;
    console.log(`getUser called for ${userId}`);

    let user: UserAttributes | null = null;

    try {
      const index = db.getIndex('/users', userId);
      if (index < 0) {
        throw new UserNotFoundError(userId);
      }
      user = db.getData(`/users[${index}]`);
      delete user!.plans;
    } catch (err) {
      if (userId === '2f740108-8596-4a8a-b334-518ab34a8c50') {
        user = generateDefaultUser();
        db.push('/users[]', user);
      } else {
        return next(err);
      }
    }

    res.send(user);
  }
);

export { router as getUserByIdRouter };
