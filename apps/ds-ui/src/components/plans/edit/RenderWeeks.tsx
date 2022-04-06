import React from 'react';
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
export const RenderWeeks = ({ days, includeWeekends, isFreeform, upFunc, downFunc, update }: IRenderWeeks) => {
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
        upFunction={upFunc}
        downFunction={downFunc}
        updateCallback={update}
        day={days[i]}
        key={days[i].id}
      />
    );
  }

  return <>{returnItems}</>;
};
