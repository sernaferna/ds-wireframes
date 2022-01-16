import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDateForActions, updateDateShowingInActions } from '../../stores/UISlice';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import { useGetActionByDateQuery } from '../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { ActionsForDay } from '@devouringscripture/common';
import { ActionWidgetForm } from './ActionWidgetForm';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { DateTime } from 'luxon';

export function ActionsWidget() {
  const dateToShow = DateTime.fromISO(useSelector(getDateForActions));
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetActionByDateQuery(dateToShow.toISODate());

  const userApiObject = useGetUserByIdQuery(HARDCODED_USER_ID);
  const userData = userApiObject.data;

  if (isLoading || userApiObject.isLoading) {
    return <LoadingMessage />;
  }
  if (error || userApiObject.error) {
    return <ErrorLoadingDataMessage />;
  }

  const handleDateScroll = (increase: boolean) => {
    let newDate;

    if (increase) {
      newDate = dateToShow.plus({ day: 1 });
    } else {
      newDate = dateToShow.minus({ day: 1 });
    }

    dispatch(updateDateShowingInActions(newDate.toISODate()));
  };

  return (
    <Card className="action-widget-card">
      <Card.Body>
        <h4>
          <CaretLeftFill
            className={dateToShow < DateTime.fromISO(userData!.signupDate) ? 'inactive-scroller' : 'active-scroller'}
            onClick={dateToShow < DateTime.fromISO(userData!.signupDate) ? undefined : () => handleDateScroll(false)}
          />
          <span>{dateToShow.toISODate()}</span>
          <CaretRightFill
            className={dateToShow > DateTime.now() ? 'inactive-scroller' : 'active-scroller'}
            onClick={dateToShow > DateTime.now() ? undefined : () => handleDateScroll(true)}
          />
        </h4>
        <ActionWidgetForm day={data as ActionsForDay} />
      </Card.Body>
    </Card>
  );
}
