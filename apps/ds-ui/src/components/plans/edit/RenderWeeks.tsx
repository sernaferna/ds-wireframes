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
