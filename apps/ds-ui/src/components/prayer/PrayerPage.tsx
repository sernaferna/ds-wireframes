import React from 'react';
import {
  PageMainContainer,
  PageMainRow,
  PageSidebarContainerCol,
  PageMainContentCol,
} from '../styled-components/StyledComponents';
import { PrayerCards } from './PrayerCards';
import { PrayerSidebar } from './PrayerSidebar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CreatePrayerItem } from './CreatePrayerItem';

export function PrayerPage() {
  return (
    <PageMainContainer>
      <PageMainRow>
        <PageSidebarContainerCol>
          <PrayerSidebar />
        </PageSidebarContainerCol>
        <PageMainContentCol>
          <Row>
            <Col className="col-12 order-last order-lg-first col-lg-9">
              <PrayerCards />
            </Col>
            <Col className="d-col-12 col-lg-3">
              <CreatePrayerItem />
            </Col>
          </Row>
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
}
