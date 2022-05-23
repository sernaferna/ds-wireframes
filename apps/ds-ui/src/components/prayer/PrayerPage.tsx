import React from 'react';
import { PrayerCards } from './PrayerCards';
import { PrayerSidebar } from './PrayerSidebar';
import { Row, Col, Container } from 'react-bootstrap';
import { CreatePrayerItem } from './CreatePrayerItem';

export function PrayerPage() {
  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <PrayerSidebar />
        </Col>
        <Col className="page-main-content-col">
          <Row>
            <Col xs="12" lg="9" className="order-last order-lg-first">
              <PrayerCards />
            </Col>
            <Col xs="12" lg="3">
              <CreatePrayerItem />
              <CreatePrayerItem confession={true} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
