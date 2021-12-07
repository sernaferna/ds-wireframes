import React from 'react';
import {
  PageMainContainer,
  PageMainRow,
  PageSidebarContainerCol,
  PageMainContentCol,
} from '../styled-components/StyledComponents';
import { ActionsWidget } from './ActionsWidget';
import { DoSidebar } from './DoSidebar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { getDateForActions } from '../../stores/UISlice';
import { CalendarView } from './CalendarView';
import { CustomActionList } from './CustomActionList';

export function DoPage() {
  const dateToShow = new Date(useSelector(getDateForActions));

  return (
    <PageMainContainer>
      <PageMainRow>
        <PageSidebarContainerCol>
          <DoSidebar />
        </PageSidebarContainerCol>
        <PageMainContentCol>
          <Row>
            <Col xs="4" className="border">
              <CalendarView dateToShow={dateToShow} />
              <ActionsWidget />
            </Col>
            <Col xs="8">
              <CustomActionList />
            </Col>
          </Row>
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
}
