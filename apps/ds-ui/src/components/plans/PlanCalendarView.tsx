import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { useGetSubscribedPlansQuery } from '../../services/InstantiatedPlanService';
import { updateDateShowingInActions } from '../../stores/UISlice';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import Calendar, { CalendarTileProperties } from 'react-calendar';
import { InstantiatedPlan } from '@devouringscripture/common';

enum DayStatus {
  completed = 'Completed',
  partiallyCompleted = 'Partially',
  notCompleted = 'Not',
}

const getStatuses = (plans: InstantiatedPlan[] | undefined): [Set<string>, Set<string>] => {
  const completedDays = new Set<string>();
  const partiallyCompletedDays = new Set<string>();

  if (plans === undefined) {
    return [completedDays, partiallyCompletedDays];
  }

  const dayList = new Map<string, DayStatus>();

  for (let i = 0; i < plans.length; i++) {
    const currentPlan = plans[i];

    if (currentPlan.days === undefined) {
      continue;
    }

    for (let j = 0; j < currentPlan.days!.length; j++) {
      const currentDate = currentPlan.days![j].scheduledDate;
      const currentDayCompleted = currentPlan.days![j].completed;

      if (!dayList.has(currentDate)) {
        dayList.set(currentDate, currentDayCompleted ? DayStatus.completed : DayStatus.notCompleted);
      } else {
        const stateInMap = dayList.get(currentDate);
        let newState: DayStatus = DayStatus.notCompleted;

        if (currentDayCompleted) {
          if (stateInMap === DayStatus.completed) {
            newState = DayStatus.completed;
          } else {
            newState = DayStatus.partiallyCompleted;
          }
        } else {
          if (stateInMap === DayStatus.completed) {
            newState = DayStatus.partiallyCompleted;
          } else {
            newState = DayStatus.notCompleted;
          }
        }
        dayList.set(currentDate, newState);
      }
    }

    dayList.forEach((value, key) => {
      if (value === DayStatus.completed) {
        completedDays.add(key);
      }
      if (value === DayStatus.partiallyCompleted) {
        partiallyCompletedDays.add(key);
      }
    });
  }

  return [completedDays, partiallyCompletedDays];
};

interface IPlanCalendarView {
  dateToShow: DateTime;
}
export const PlanCalendarView = ({ dateToShow }: IPlanCalendarView) => {
  const { data, error, isLoading } = useGetSubscribedPlansQuery();
  const dispatch = useDispatch();

  const dayClickedInCalendar = useCallback(
    (value: Date, event: any) => {
      const dateToDispatch = DateTime.fromJSDate(value);
      dispatch(updateDateShowingInActions(dateToDispatch.toISODate()));
    },
    [dispatch]
  );

  const [completedDates, partiallyCompletedDates] = useMemo(() => {
    return getStatuses(data);
  }, [data]);

  const getTileClassName = useCallback(
    ({ date }: CalendarTileProperties): string => {
      const calDate = DateTime.fromJSDate(date).toISODate();
      if (completedDates.has(calDate)) {
        return 'fw-bolder bg-success text-white bg-gradient';
      }
      if (partiallyCompletedDates.has(calDate)) {
        return 'fw-bolder bg-warning text-dark bg-gradient';
      }

      return '';
    },
    [completedDates, partiallyCompletedDates]
  );

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  return (
    <Calendar
      value={dateToShow.toJSDate()}
      maxDate={DateTime.now().toJSDate()}
      onClickDay={dayClickedInCalendar}
      returnValue="end"
      tileClassName={getTileClassName}
    />
  );
};
