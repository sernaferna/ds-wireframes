import { isVersionValid, isReferenceValid } from '@devouringscripture/common';

const stringValidation = (fieldName: string, fieldValue: string): string | null => {
  if (fieldValue.trim() === '') {
    return `${fieldName} is required`;
  }

  return null;
};

const numWeeksValidation = (numWeeks: number): string | null => {
  if (numWeeks < 1) {
    return 'Invalid number of weeks';
  }

  return null;
};

const versionValidation = (version: string): string | null => {
  if (!isVersionValid(version)) {
    return 'Invalid version numnber';
  }

  return null;
};

const referenceValidation = (ref: string): string | null => {
  if (ref && ref.length > 0 && !isReferenceValid(ref)) {
    return 'Invalid reference';
  }

  return null;
};

const anyBooleanValidation = (theValue: string | boolean): string | null => {
  return null;
};

// using a dictionary-style notation so that the `validation[name](value)` notation will work
type ValidationFunction = (value: any) => string | null;
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
};

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
}
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
