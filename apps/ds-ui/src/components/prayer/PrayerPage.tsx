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
            <Col className="cards-column">
              <PrayerCards />
            </Col>
            <Col className="create-prayer-column">
              <CreatePrayerItem />
              <CreatePrayerItem confession={true} />
            </Col>
          </Row>
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
}
