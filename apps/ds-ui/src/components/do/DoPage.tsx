import React from 'react';
import { ActionsWidget } from './ActionsWidget';
import { DoSidebar } from './DoSidebar';
import { Col, Row, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getDateForActions } from '../../stores/UISlice';
import { CalendarView } from './CalendarView';
import { CustomActionList } from './CustomActionList';
import { DateTime } from 'luxon';

export function DoPage() {
  const dateToShow = DateTime.fromISO(useSelector(getDateForActions));

  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <DoSidebar />
        </Col>
        <Col className="page-main-content-col">
          <Row>
            <Col className="col-6">
              <CalendarView dateToShow={dateToShow} />
              <ActionsWidget />
            </Col>
            <Col className="col-6">
              <CustomActionList />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
