import React from 'react';
import { HomeSidebar } from './HomeSidebar';
import { Col, Row, Container } from 'react-bootstrap';
import { CurrentReadingPlan } from '../plans/read/CurrentReadingPlan';
import { PrayerSnapshot } from '../prayer/PrayerSnapshot';
import { ActionsWidget } from '../do/ActionsWidget';
import { CreatePrayerItem } from '../prayer/CreatePrayerItem';
import { useErrorsAndWarnings } from '../../hooks/ErrorsAndWarning';

export const Home = () => {
  const [AlertUI, setErrorMessage] = useErrorsAndWarnings();

  return (
    <Container fluid={true} className="page-main-container">
      <AlertUI />

      <Row>
        <Col className="page-sidebar-container-col">
          <HomeSidebar />
        </Col>
        <Col className="page-main-content-col">
          <h1 className="d-none d-md-block">Devouring Scripture: Base Actions</h1>
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
        </Col>
      </Row>
    </Container>
  );
};
