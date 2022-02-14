import { body } from 'express-validator';
import { isVersionValid, PlanVersionError } from '@devouringscripture/common';

export const basePlanValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name required'),
    body('description').notEmpty().withMessage('Description required'),
    body('length').isInt({ min: 1 }).withMessage('Length required'),
    body('isAdmin').isBoolean().withMessage('Must indicate if is admin'),
    body('includesApocrypha').isBoolean().withMessage('Must indicate if includes apocrypha'),
    body('includeWeekends').isBoolean().withMessage('Must indicate if includes weekends'),
    body('version').custom((value) => {
      if (!isVersionValid(value)) {
        throw new PlanVersionError(value);
      }

      return true;
    }),
    body('osis').notEmpty().withMessage('Must include OSIS string'),
  ];
};

export const planValidationRules = () => {
  const baseRules = basePlanValidationRules();

  return baseRules.concat([
    body('planInstanceId').isUUID().withMessage('Valid instance ID required'),
    body('planId').isUUID().withMessage('Valid plan ID required'),
  ]);
};
