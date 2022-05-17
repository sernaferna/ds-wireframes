import {
  Verse,
  getRefForVerses,
  PlanDay,
  getOSISForReference,
  BasePlanAttributes,
  PlanAttributes,
} from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';
import { PlanValues } from './EditPlanValidations';

/**
 * Client-only interface for working with 'days' used for driving the UI
 * (as opposed to `PlanDay` which is the interface used for the server-side
 * APIs).
 */
export interface DayForPlan {
  verses?: Verse[];
  osis?: string;
  id: string;
}

/**
 * Almost but not quite a standard array-handling function; it moves a
 * `Verse` object from one array to another. If the originating array
 * is empty, nothing happens.
 *
 * @param arr1 The array from which to pull the `Verse`
 * @param arr2 The array to which the `Verse` should be appended
 */
const moveVerseToArr = (arr1: Verse[], arr2: Verse[]): void => {
  if (arr1.length < 1) {
    return;
  }

  arr2.push(arr1[0]);
  arr1.splice(0, 1);
};

/**
 * Given the incoming data (typically returned from the server-side API),
 * returns an array of `DayForPlan` objects to be displayed in the UI.
 *
 * @param isFreeform Indicates if this is an array of free-form days
 * @param numWeeks Number of weeks for which days should be generated
 * @param includeWeekends Indicates if this plan includes weekends
 * @param verses [Optional] array of `Verse` objects, to be spread across
 * @returns Array of `DayForPlan` objects
 */
export const generateDayList = (
  isFreeform: boolean,
  numWeeks: number,
  includeWeekends: boolean,
  verses: Verse[] | undefined
): DayForPlan[] => {
  const daysPerWeek = includeWeekends ? 7 : 5;
  const totalDays = numWeeks * daysPerWeek;
  const days: DayForPlan[] = [];

  for (let i = 0; i < totalDays; i++) {
    days.push({ id: uuidv4() });
  }

  if (isFreeform || verses === undefined || verses.length < 1) {
    return days;
  }

  const daySpreaderValues: number[] = days.map(() => 0);

  let index = 0;
  for (let i = 0; i < verses.length; i++) {
    daySpreaderValues[index]++;

    index++;
    if (index >= daySpreaderValues.length) {
      index = 0;
    }
  }

  for (let i = 0; i < days.length; i++) {
    if (days[i].verses === undefined) {
      days[i].verses = [];
    }

    for (let j = 0; j < daySpreaderValues[i]; j++) {
      moveVerseToArr(verses, days[i].verses!);
    }

    days[i].osis = getRefForVerses(days[i].verses);
  }

  return days;
};

/**
 * Helper function to get a number, boolean, or (default) string value out of a variable
 *
 * @param type The type of input (number and checkbox are currently supported)
 * @param value The value (initially as a string) to be returned
 * @returns The value from the `value` attribute, as a number, bool, or string
 */
export const getValue = (type: string, value: string): string | number | boolean => {
  if (type === 'number') {
    return +value;
  }

  if (type === 'checkbox') {
    if (value === 'on') {
      return true;
    } else {
      return false;
    }
  }

  return value;
};

/**
 * Helper function to take the list of `DayforPlan` objects and convert them to
 * uploadable `PlanDay` data. Doesn't validate any of the data, because the rules
 * are different for Saving vs. Publishing; let the server-side API do that.
 *
 * @param days Array of days as captured by the UI
 * @returns Array of days to be uploaded to the API
 */
export const generateDaysForUpload = (days: DayForPlan[]): PlanDay[] => {
  return days.map((day) => {
    if (day.osis) {
      return { osis: getOSISForReference(day.osis) };
    }

    if (day.verses) {
      return { osis: getOSISForReference(getRefForVerses(day.verses)) };
    }

    return { osis: '' };
  });
};

/**
 * Helper function to generate an object suitable for uploading to the Plan API
 * @param values The values for the plan as captured in the form
 * @param days The list of days as captured in the form
 * @returns PlanAttributes or BasePlanAttributes object, as the case may be
 */
export const generatePlanForUpload = (values: PlanValues, days: DayForPlan[]): BasePlanAttributes | PlanAttributes => {
  let uploadableDays: any;
  try {
    uploadableDays = generateDaysForUpload(days);
  } catch {
    throw new Error('Invalid day list');
  }

  const plan: BasePlanAttributes = {
    name: values.planName,
    description: values.description,
    includeWeekends: values.includeWeekends,
    includesApocrypha: values.includeApocrypha,
    isAdmin: values.isAdmin,
    isFreeform: values.isFreeform,
    length: values.numWeeks,
    osis: values.reference,
    version: values.version,
    days: uploadableDays,
  };

  let uploadablePlan: BasePlanAttributes | PlanAttributes = plan;
  if (values.planInstanceId) {
    const fullPlan: PlanAttributes = {
      ...plan,
      planId: values.planId!,
      planInstanceId: values.planInstanceId!,
      status: values.status!,
      days: uploadableDays,
    };
    uploadablePlan = fullPlan;
  }

  return uploadablePlan;
};
