import React from 'react';
import { HomeSidebar } from './HomeSidebar';
import { Col, Row, Container } from 'react-bootstrap';
import { CurrentReadingPlan } from '../plans/read/CurrentReadingPlan';
import { PrayerSnapshot } from '../prayer/PrayerSnapshot';
import { ActionsWidget } from '../do/ActionsWidget';

export const Home = () => {
  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <HomeSidebar />
        </Col>
        <Col className="page-main-content-col">
          <Row>
            <Col xs="12" md="6" lg="4">
              <ActionsWidget showTitle={true} />
            </Col>
            <Col xs="12" md="6" lg="4">
              <CurrentReadingPlan showTitle={true} />
            </Col>
            <Col xs="12" lg="4">
              <PrayerSnapshot showTitle={true} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
