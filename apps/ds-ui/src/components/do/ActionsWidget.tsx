import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDateForActions, updateDateShowingInActions } from '../../stores/UISlice';
import { CaretLeft, CaretRight } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import { useGetActionByDateQuery } from '../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { ActionsForDay } from '@devouringscripture/common/src/dm/Action';
import { ActionWidgetForm } from './ActionWidgetForm';
import styled from 'styled-components';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { DateTime } from 'luxon';

const PreviousDayButton = styled(CaretLeft).attrs(() => ({}))`
  cursor: pointer;
`;

const NextDayButton = styled(CaretRight).attrs(() => ({}))`
  cursor: pointer;
`;

const DisabledPreviousDayButton = styled(CaretLeft).attrs(() => ({
  className: 'text-muted',
}))``;

const DisabledNextDayButton = styled(CaretRight).attrs(() => ({
  className: 'text-muted',
}))``;

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
    <Card className="m-0 border-0">
      <Card.Body>
        <h4>
          {dateToShow < DateTime.fromISO(userData!.signupDate) ? (
            <DisabledPreviousDayButton />
          ) : (
            <PreviousDayButton onClick={() => handleDateScroll(false)} />
          )}
          <span className="user-select-none">{dateToShow.toISODate()}</span>
          {dateToShow > DateTime.now() ? (
            <DisabledNextDayButton />
          ) : (
            <NextDayButton onClick={() => handleDateScroll(true)} />
          )}
        </h4>
        <ActionWidgetForm day={data as ActionsForDay} />
      </Card.Body>
    </Card>
  );
}
