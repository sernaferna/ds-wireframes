import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { CurrentReadingPlan } from '../plans/read/CurrentReadingPlan';
import { PrayerSnapshot } from '../prayer/PrayerSnapshot';
import { ActionsWidget } from '../do/ActionsWidget';
import { CreatePrayerItem } from '../prayer/CreatePrayerItem';
import { useErrorsAndWarnings } from '../../hooks/ErrorsAndWarning';

/**
 * Main page/component for the **Home** section of teh application. Sets
 * up the `AlertUI` widget, and passes on `setErrorMessage()` function
 * to some child components.
 */
export const Home = () => {
  const [AlertUI, setErrorMessage] = useErrorsAndWarnings();

  return (
    <Container fluid={true} className="page-main-container">
      <AlertUI />

      <Row>
        <Col xs="12" sm="6" lg="4" xxl="3">
          <CurrentReadingPlan showTitle={true} />
        </Col>
        <Col xs="12" sm="6" lg="4" xxl="3">
          <ActionsWidget showTitle={true} setErrorMessage={setErrorMessage} />
        </Col>
        <Col xs="12" sm="4" lg="4" xxl="3">
          <PrayerSnapshot showTitle={true} />
        </Col>
        <Col xs="12" sm="8" lg="12" xxl="3">
          <CreatePrayerItem />
        </Col>
      </Row>
    </Container>
  );
};
