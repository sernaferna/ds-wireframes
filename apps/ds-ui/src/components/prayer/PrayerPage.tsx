import React from 'react';
import { PrayerCards } from './PrayerCards';
import { PrayerSidebar } from './PrayerSidebar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
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
            <Col className="cards-column">
              <PrayerCards />
            </Col>
            <Col className="create-prayer-column">
              <CreatePrayerItem />
              <CreatePrayerItem confession={true} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
