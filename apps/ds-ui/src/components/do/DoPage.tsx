import React from 'react';
import { ActionsWidget } from './ActionsWidget';
import { DoSidebar } from './DoSidebar';
import { Col, Row, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getDateForActions } from '../../stores/UISlice';
import { CalendarView } from './CalendarView';
import { CustomActionList } from './CustomActionList';
import { DateTime } from 'luxon';
import { useErrorsAndWarnings } from '../../hooks/ErrorsAndWarning';

/**
 * Main page/component for the **Do** section of the application. Sets
 * up the `AlertUI` component, and passes on the `setErrorMessage()`
 * function to some child components.
 */
export function DoPage() {
  const dateToShow = DateTime.fromISO(useSelector(getDateForActions));
  const [AlertUI, setErrorMessage] = useErrorsAndWarnings();

  return (
    <Container fluid={true} className="page-main-container">
      <AlertUI />

      <Row>
        <Col className="page-sidebar-container-col">
          <DoSidebar />
        </Col>
        <Col className="page-main-content-col">
          <Row>
            <Col xs="12" md="8" lg="6">
              <CalendarView dateToShow={dateToShow} />
              <ActionsWidget setErrorMessage={setErrorMessage} />
            </Col>
            <Col xs="12" md="4" lg="6">
              <CustomActionList />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
