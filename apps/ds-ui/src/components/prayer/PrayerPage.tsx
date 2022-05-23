import React from 'react';
import { PrayerCards } from './PrayerCards';
import { PrayerSidebar } from './PrayerSidebar';
import { Row, Col, Container } from 'react-bootstrap';
import { CreatePrayerItem } from './CreatePrayerItem';
import { PrayerSnapshot } from './PrayerSnapshot';

export function PrayerPage() {
  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <PrayerSidebar />
        </Col>
        <Col className="page-main-content-col">
          <h1 className="d-none d-md-block">Prayer</h1>
          <Row>
            <Col xs="12" lg="8">
              <div className="d-md-none">
                <PrayerSnapshot />
              </div>
              <div className="d-none d-md-block">
                <PrayerCards />
              </div>
            </Col>
            <Col xs="12" lg="4">
              <CreatePrayerItem />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
