import { body } from 'express-validator';
import { isVersionValid, PlanVersionError } from '@devouringscripture/common';

/**
 * Keeps all validation rules for Base Plans in one place, to be reused
 * in any Express routes that need Plan validation.
 *
 * @returns Array of Express Validator rules
 */
export const basePlanValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name required'),
    body('description').notEmpty().withMessage('Description required'),
    body('length').isInt({ min: 1 }).withMessage('Length required'),
    body('isAdmin').isBoolean().withMessage('Must indicate if is admin'),
    body('includesApocrypha').isBoolean().withMessage('Must indicate if includes apocrypha'),
    body('includeWeekends').isBoolean().withMessage('Must indicate if includes weekends'),
    body('isFreeform').isBoolean().withMessage('Freeform indicator required'),
    body('version').custom((value) => {
      if (!isVersionValid(value)) {
        throw new PlanVersionError(value);
      }

      return true;
    }),
  ];
};

export const planValidationRules = () => {
  const baseRules = basePlanValidationRules();

  return baseRules.concat([
    body('planInstanceId').isUUID().withMessage('Valid instance ID required'),
    body('planId').isUUID().withMessage('Valid plan ID required'),
  ]);
};
