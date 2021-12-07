import React from 'react';
import { useGetActionsForMonthQuery } from '../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { useDispatch } from 'react-redux';
import { updateDateShowingInActions } from '../../stores/UISlice';
import Calendar from 'react-calendar';
import './Calendar.css';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';

interface CalendarViewInterface {
  dateToShow: Date;
}

export function CalendarView(props: CalendarViewInterface) {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetActionsForMonthQuery({
    year: props.dateToShow.getFullYear(),
    month: props.dateToShow.getMonth(),
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
    dispatch(updateDateShowingInActions(value.toISOString().split('T')[0]));
  };

  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  return (
    <Calendar
      value={props.dateToShow}
      minDate={new Date(userData!.signupDate)}
      maxDate={tomorrow}
      onClickDay={dayClickedInCalendar}
      returnValue="end"
      tileClassName={({ date, view }) => {
        const calDate = date.toISOString().split('T')[0];
        if (actionsSet.has(calDate)) {
          return 'fw-bolder text-success';
        }
        return '';
      }}
    />
  );
}
