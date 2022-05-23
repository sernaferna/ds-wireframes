import React from 'react';
import { HomeSidebar } from './HomeSidebar';
import { Col, Row, Container } from 'react-bootstrap';
import { CurrentReadingPlan } from '../plans/read/CurrentReadingPlan';
import { PrayerSnapshot } from '../prayer/PrayerSnapshot';
import { ActionsWidget } from '../do/ActionsWidget';
import { CreatePrayerItem } from '../prayer/CreatePrayerItem';

export const Home = () => {
  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <HomeSidebar />
        </Col>
        <Col className="page-main-content-col">
          <h1 className="d-none d-md-block">Devouring Scripture: Base Actions</h1>
          <Row>
            <Col xs="12" md="6" lg="4">
              <CurrentReadingPlan showTitle={true} />
            </Col>
            <Col xs="12" md="6" lg="4">
              <ActionsWidget showTitle={true} />
            </Col>
            <Col xs="12" lg="4">
              <Row>
                <Col xs="12" sm="4" lg="12">
                  <PrayerSnapshot showTitle={true} />
                </Col>
                <Col xs="12" sm="8" lg="12">
                  <CreatePrayerItem />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
