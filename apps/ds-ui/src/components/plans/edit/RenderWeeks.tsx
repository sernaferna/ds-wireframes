import React, { useMemo } from 'react';
import { DayForPlan } from './Helpers';
import { RenderDay } from './RenderDay';

interface IRenderWeeks {
  days: DayForPlan[];
  includeWeekends: boolean;
  isFreeform: boolean;
  upFunc(day: number, cascade?: boolean): void;
  downFunc(day: number, cascade?: boolean): void;
  update(day: DayForPlan): void;
}

/**
 * Given an array of `DayForPlan` objects, renders out all of the
 * `RenderDay` items required. For better UI, the days are broken
 * down by Weeks, with a heading inserted at the beginning of each
 * week, since much of the UI revolves around a number of **weeks**,
 * not a number of **days**.
 *
 * Mostly a passthrough to the `RenderDay` component, to render each
 * day, so most of the callbacks are simply passed through to that
 * component, not used here.
 *
 * @param days Array of `DayForPlan` objects to be rendered
 * @param includeWeekends Whether weekends should be included
 * @param isFreeform Whether the references are freeform (true) or simply a distributed set of verses (false)
 * @param upFunc Callback when a verse is moved "up" from one day to another
 * @param downFunc Callback when a verse is moved "down" from one day to another
 * @param update Callback for when a day's data is updated
 */
export const RenderWeeks = ({ days, includeWeekends, isFreeform, upFunc, downFunc, update }: IRenderWeeks) => {
  const daysPerWeek = useMemo(() => (includeWeekends ? 7 : 5), [includeWeekends]);

  const returnItems: JSX.Element[] = useMemo(() => {
    const items: JSX.Element[] = [];
    let weekNum = 0;

    for (let i = 0; i < days.length; i++) {
      if (i % daysPerWeek === 0) {
        weekNum++;
        items.push(
          <div className="h3 mt-3" key={`week-key-${weekNum}`}>
            Week {weekNum}
          </div>
        );
      }

      items.push(
        <RenderDay
          dayNum={i + 1}
          maxDays={days.length}
          isFreeform={isFreeform}
          upFunction={upFunc}
          downFunction={downFunc}
          updateCallback={update}
          day={days[i]}
          key={days[i].id}
        />
      );
    }

    return items;
  }, [daysPerWeek, days, isFreeform, upFunc, downFunc, update]);

  return <>{returnItems}</>;
};
