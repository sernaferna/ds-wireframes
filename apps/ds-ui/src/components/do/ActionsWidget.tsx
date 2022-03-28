import React, { useCallback } from 'react';
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

  const handleDateScroll = useCallback(
    (increase: boolean) => {
      let newDate;

      if (increase) {
        newDate = dateToShow.plus({ day: 1 });
      } else {
        newDate = dateToShow.minus({ day: 1 });
      }

      dispatch(updateDateShowingInActions(newDate.toISODate()));
    },
    [dispatch, dateToShow]
  );

  const handleLeftClick = () => {
    return () => {
      if (dateToShow < DateTime.fromISO(userData!.signupDate)) {
        return;
      }

      handleDateScroll(false);
    };
  };

  const handleRightClick = () => {
    return () => {
      if (dateToShow > DateTime.now()) {
        return;
      }

      handleDateScroll(true);
    };
  };

  if (isLoading || userApiObject.isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }
  if (userApiObject.error) {
    return <ErrorLoadingDataMessage theError={userApiObject.error} />;
  }

  return (
    <Card className="action-widget-card">
      <Card.Body>
        <h4>
          <CaretLeftFill
            className={dateToShow < DateTime.fromISO(userData!.signupDate) ? 'inactive-scroller' : 'active-scroller'}
            onClick={handleLeftClick()}
          />
          <span>{dateToShow.toISODate()}</span>
          <CaretRightFill
            className={dateToShow > DateTime.now() ? 'inactive-scroller' : 'active-scroller'}
            onClick={handleRightClick()}
          />
        </h4>
        <ActionWidgetForm day={data as ActionsForDay} />
      </Card.Body>
    </Card>
  );
}
