import React from 'react';
import { useGetActionsForMonthQuery } from '../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { useDispatch } from 'react-redux';
import { updateDateShowingInActions } from '../../stores/UISlice';
import Calendar from 'react-calendar';
import './Calendar.css';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { DateTime } from 'luxon';

interface CalendarViewInterface {
  dateToShow: DateTime;
}

export function CalendarView(props: CalendarViewInterface) {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetActionsForMonthQuery({
    year: props.dateToShow.get('year'),
    month: props.dateToShow.get('month'),
  });
  const userDataObj = useGetUserByIdQuery(HARDCODED_USER_ID);
  const userData = userDataObj.data;

  if (isLoading || userDataObj.isLoading) {
    return <LoadingMessage />;
  }
  if (error || userDataObj.error) {
    return <ErrorLoadingDataMessage />;
  }

  const actionsSet = new Set();
  data!.forEach((element) => {
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

  const dayClickedInCalendar = (value: Date, event: any) => {
    const dateToDispatch = DateTime.fromJSDate(value);
    dispatch(updateDateShowingInActions(dateToDispatch.toISODate()));
  };

  const today = DateTime.now();

  return (
    <Calendar
      value={props.dateToShow.toJSDate()}
      minDate={new Date(userData!.signupDate)}
      maxDate={today.toJSDate()}
      onClickDay={dayClickedInCalendar}
      returnValue="end"
      tileClassName={({ date, view }) => {
        //const calDate = date.toISOString().split('T')[0];
        const calDate = DateTime.fromJSDate(date).toISODate();
        if (actionsSet.has(calDate)) {
          return 'fw-bolder text-success';
        }
        return '';
      }}
    />
  );
}
