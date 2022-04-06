import React, { useState, useCallback, useMemo } from 'react';
import { useGetActionsForMonthQuery } from '../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { useDispatch } from 'react-redux';
import { updateDateShowingInActions } from '../../stores/UISlice';
import Calendar, { CalendarTileProperties } from 'react-calendar';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { DateTime } from 'luxon';
import { ActionsForDay } from '@devouringscripture/common';

const getActionSet = (data: ActionsForDay[] | undefined): Set<string> => {
  const actionsSet = new Set<string>();

  if (data === undefined) {
    return actionsSet;
  }

  data.forEach((element) => {
    let finishedItems = false;

    for (let i = 0; i < element.customActions.length; i++) {
      if (element.customActions[i].completed) {
        finishedItems = true;
        break;
      }
    }
    if (finishedItems) {
      actionsSet.add(element.date);
      return;
    }

    for (let i = 0; i < element.defaultActions.length; i++) {
      if (element.defaultActions[i].completed) {
        actionsSet.add(element.date);
        return;
      }
    }
  });

  return actionsSet;
};

interface ICalendarView {
  dateToShow: DateTime;
}
export function CalendarView({ dateToShow }: ICalendarView) {
  const [monthToShow, updateMonthToShow] = useState(dateToShow);
  const dispatch = useDispatch();
  let { data, error, isLoading } = useGetActionsForMonthQuery({
    year: monthToShow.get('year'),
    month: monthToShow.get('month'),
  });
  const userDataObj = useGetUserByIdQuery(HARDCODED_USER_ID);
  const userData = userDataObj.data;

  const dayClickedInCalendar = useCallback(
    (value: Date, event: any) => {
      const dateToDispatch = DateTime.fromJSDate(value);
      dispatch(updateDateShowingInActions(dateToDispatch.toISODate()));
    },
    [dispatch]
  );

  interface PrevNextClickInterface {
    activeStartDate: Date;
    value: Date;
    view: string;
  }
  const prevNextClickedInCalendar = useCallback(
    (props: PrevNextClickInterface) => {
      const monthDateToShow = DateTime.fromJSDate(props.activeStartDate);
      updateMonthToShow(monthDateToShow);
    },
    [updateMonthToShow]
  );

  const actionsSet: Set<string> = useMemo(() => getActionSet(data), [data]);

  const getTileClassName = useCallback(
    ({ date }: CalendarTileProperties): string => {
      const calDate = DateTime.fromJSDate(date).toISODate();
      if (actionsSet.has(calDate)) {
        return 'fw-bolder text-success';
      }

      return '';
    },
    [actionsSet]
  );

  if (isLoading || userDataObj.isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }
  if (userDataObj.error) {
    return <ErrorLoadingDataMessage theError={userDataObj.error} />;
  }

  return (
    <Calendar
      value={dateToShow.toJSDate()}
      minDate={new Date(userData!.signupDate)}
      maxDate={DateTime.now().toJSDate()}
      onClickDay={dayClickedInCalendar}
      onActiveStartDateChange={prevNextClickedInCalendar}
      returnValue="end"
      tileClassName={getTileClassName}
    />
  );
}
