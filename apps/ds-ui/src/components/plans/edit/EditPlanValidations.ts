import { isVersionValid, isReferenceValid, PlanStatus } from '@devouringscripture/common';

/**
 * Helper function to validate that any generic string is not empty
 *
 * @param fieldName Name of the field to validate
 * @param fieldValue Value to be validated
 * @returns An error message, or `null` if the field is valid
 */
const stringValidation = (fieldName: string, fieldValue: string): string | null => {
  if (fieldValue.trim() === '') {
    return `${fieldName} is required`;
  }

  return null;
};

/**
 * Validates that the number of weeks entered for the plan is valid;
 * currently just validating that the number is positive.
 *
 * @param numWeeks The number to be validated
 * @returns An error message, or `null` if the field is valid
 */
const numWeeksValidation = (numWeeks: number): string | null => {
  if (numWeeks < 1) {
    return 'Invalid number of weeks';
  }

  return null;
};

/**
 * Validates that the version number entered is valid; pass-through
 * to the `isVersionValid` function from `@devouringscripture/common`,
 * but essentially must be #.#.# format.
 *
 * @param version The version (in string format)
 * @returns An error message, or `null` if the field is valid
 */
const versionValidation = (version: string): string | null => {
  if (!isVersionValid(version)) {
    return 'Invalid version numnber';
  }

  return null;
};

/**
 * Validates that a Bible references is valid; pass-through to
 * `isReferenceValid` function.
 *
 * @param ref The reference string
 * @returns An error message, or `null` if the field is valid
 */
const referenceValidation = (ref: string): string | null => {
  if (ref && ref.length > 0 && !isReferenceValid(ref)) {
    return 'Invalid reference';
  }

  return null;
};

/**
 * Validates that the status of this plan is valid; never
 * returns an error, for now.
 *
 * @param status The status string
 * @returns Always returns `null`
 */
const statusValidation = (status: string): string | null => {
  return null;
};

/**
 * Helper function to validate any generic field that is supposed
 * to be Boolean; never returns an error, for now.
 *
 * @param theValue The value to be validated
 * @returns Always returns `null`
 */
const anyBooleanValidation = (theValue: string | boolean): string | null => {
  return null;
};

/**
 * Generic interface for a validation function that takes in the value
 * to be validated, and returns either an error message (string) or
 * null if the value is valid.
 */
type ValidationFunction = (value: any) => string | null;

/**
 * Dictionary of validation functions, for each field in the form. Using
 * a dictionary-style notation to get an easy to use `validation[name](value)`
 * notation.
 */
export const validate: { [id: string]: ValidationFunction } = {
  planName: (nameString: string) => stringValidation('Name', nameString),
  description: (descString: string) => stringValidation('Description', descString),
  numWeeks: numWeeksValidation,
  version: versionValidation,
  isAdmin: anyBooleanValidation,
  includeApocrypha: anyBooleanValidation,
  includeWeekends: anyBooleanValidation,
  isFreeform: anyBooleanValidation,
  reference: referenceValidation,
  planInstanceId: () => null,
  planId: () => null,
  status: statusValidation,
};

/**
 * Data model for the data captured for a plan, *not* including days,
 * which are handled separately.
 */
export interface PlanValues {
  planName: string;
  description: string;
  numWeeks: number;
  version: string;
  isAdmin: boolean;
  includeApocrypha: boolean;
  includeWeekends: boolean;
  isFreeform: boolean;
  reference: string;
  planInstanceId?: string;
  planId?: string;
  status?: PlanStatus;
}

/**
 * Initial values to use when a blank Edit Plan form is started.
 */
export const initialPlanValues: PlanValues = {
  planName: '',
  description: '',
  numWeeks: 0,
  version: '1.0.0',
  isAdmin: false,
  includeApocrypha: false,
  includeWeekends: true,
  isFreeform: true,
  reference: '',
};
