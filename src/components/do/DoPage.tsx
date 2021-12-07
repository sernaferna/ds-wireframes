import React from 'react';
import {
  PageMainContainer,
  PageMainRow,
  PageSidebarContainerCol,
  PageMainContentCol,
} from '../styled-components/StyledComponents';
import { ActionsWidget } from './ActionsWidget';
import Calendar from 'react-calendar';
import './Calendar.css';
import { DoSidebar } from './DoSidebar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { useSelector, useDispatch } from 'react-redux';
import { getDateForActions, updateDateShowingInActions } from '../../stores/UISlice';
import { useGetActionsForMonthQuery } from '../../services/ActionsService';

export function DoPage() {
  const dateToShow = new Date(useSelector(getDateForActions));
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const actionsForMonth = useGetActionsForMonthQuery({ year: dateToShow.getFullYear(), month: dateToShow.getMonth() });

  if (isLoading || actionsForMonth.isLoading) {
    return <LoadingMessage />;
  }
  if (error || actionsForMonth.error) {
    return <ErrorLoadingDataMessage />;
  }

  const actionsSet = new Set();
  actionsForMonth.data!.forEach((element) => {
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

  // For some reason the calendar widget seems to want the date to be increased by 1 in order to render/function properly
  dateToShow.setDate(dateToShow.getDate() + 1);

  const dayClickedInCalendar = (value: Date, event: any) => {
    dispatch(updateDateShowingInActions(value.toISOString().split('T')[0]));
  };

  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  return (
    <PageMainContainer>
      <PageMainRow>
        <PageSidebarContainerCol>
          <DoSidebar />
        </PageSidebarContainerCol>
        <PageMainContentCol>
          <Row>
            <Col xs="6">
              <Calendar
                value={dateToShow}
                minDate={new Date(data!.signupDate)}
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
              <ActionsWidget />
            </Col>
            <Col xs="6">
              <div>Other stuff</div>
            </Col>
          </Row>
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
}
