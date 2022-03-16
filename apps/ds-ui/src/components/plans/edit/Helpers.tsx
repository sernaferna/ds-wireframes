import { Verse } from '@devouringscripture/common';
import { getRefForVerses } from '@devouringscripture/refparse';
import { RenderDay } from './RenderDay';
import { v4 as uuidv4 } from 'uuid';

export interface DayForPlan {
  verses?: Verse[];
  osis?: string;
  id: string;
}

const moveVerseToArr = (arr1: Verse[], arr2: Verse[]): void => {
  if (arr1.length < 1) {
    return;
  }

  arr2.push(arr1[0]);
  arr1.splice(0, 1);
};

interface IGenDayList {
  isFreeform: boolean;
  numWeeks: number;
  includeWeekends: boolean;
  verses: Verse[] | undefined;
}
export const generateDayList = ({ isFreeform, numWeeks, includeWeekends, verses }: IGenDayList): DayForPlan[] => {
  const daysPerWeek = includeWeekends ? 7 : 5;
  const totalDays = numWeeks * daysPerWeek;
  const days: DayForPlan[] = [];

  for (let i = 0; i < totalDays; i++) {
    days.push({ id: uuidv4() });
  }

  if (isFreeform || verses === undefined || verses.length < 1) {
    return days;
  }

  let versesPerDay = Math.ceil(verses.length / days.length);
  if (versesPerDay < 1) {
    versesPerDay = 1;
  }

  for (let i = 0; i < days.length; i++) {
    if (days[i].verses === undefined) {
      days[i].verses = [];
    }

    for (let j = 0; j < versesPerDay; j++) {
      moveVerseToArr(verses, days[i].verses!);
    }

    days[i].osis = getRefForVerses(days[i].verses);
  }

  return days;
};

interface IRenderedDays {
  days: DayForPlan[];
  includeWeekends: boolean;
  isFreeform: boolean;
  inc(day: number): void;
  dec(day: number): void;
  update(day: DayForPlan): void;
}
export const RenderedDays = ({ days, includeWeekends, isFreeform, inc, dec, update }: IRenderedDays) => {
  const daysPerWeek = includeWeekends ? 7 : 5;
  const returnItems: JSX.Element[] = [];
  let weekNum = 0;

  for (let i = 0; i < days.length; i++) {
    if (i % daysPerWeek === 0) {
      weekNum++;
      returnItems.push(
        <h2 className="mt-3" key={`week-key-${weekNum}`}>
          Week {weekNum}
        </h2>
      );
    }

    returnItems.push(
      <RenderDay
        dayNum={i + 1}
        maxDays={days.length}
        isFreeform={isFreeform}
        incrementFunction={inc}
        decrementFunction={dec}
        updateCallback={update}
        day={days[i]}
        key={days[i].id}
      />
    );
  }

  return <>{returnItems}</>;
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
