import { body } from 'express-validator';

export const userValidationRules = () => {
  return [
    body('signupDate').isDate().withMessage('Valid signup date required'),
    body('id').isUUID().withMessage('Valid User ID required'),
    body('isAdmin').isBoolean().withMessage('Must specify admin or not'),
    body('settings.showSizeIndicator').isBoolean().withMessage('Show Size Indicator setting required'),
    body('settings.showToastTester').isBoolean().withMessage('Show Toast Tester setting required'),
  ];
};
