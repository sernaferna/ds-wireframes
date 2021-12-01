import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDateForActions, updateDateShowingInActions } from '../../stores/UISlice';
import { CaretLeft, CaretRight } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import { useGetActionByDateQuery } from '../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { ActionsForDay } from '../../datamodel/Action';
import { ActionWidgetForm } from './ActionWidgetForm';
import styled from 'styled-components';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';

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
  const dateToShow = new Date(useSelector(getDateForActions));
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetActionByDateQuery(dateToShow.toISOString().split('T')[0]);

  const userApiObject = useGetUserByIdQuery(HARDCODED_USER_ID);
  const userData = userApiObject.data;

  if (isLoading || userApiObject.isLoading) {
    return <LoadingMessage />;
  }
  if (error || userApiObject.error) {
    return <ErrorLoadingDataMessage />;
  }

  const handleDateScroll = (increase: boolean) => {
    let newDate = new Date(dateToShow);
    if (increase) {
      newDate.setDate(dateToShow.getDate() + 1);
    } else {
      newDate.setDate(dateToShow.getDate() - 1);
    }

    dispatch(updateDateShowingInActions(newDate.toISOString().split('T')[0]));
  };

  return (
    <Card className="m-0 border-0">
      <Card.Body>
        <h4>
          {dateToShow < new Date(userData!.signupDate) ? (
            <DisabledPreviousDayButton />
          ) : (
            <PreviousDayButton onClick={() => handleDateScroll(false)} />
          )}
          <span className="user-select-none">{dateToShow.toISOString().split('T')[0]}</span>
          {dateToShow > new Date(Date.now()) ? (
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
