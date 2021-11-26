import React from 'react';
import { PageMainContainer, PageMainRow, PageSidebarContainerCol, PageMainContentCol } from '../styled-components/StyledComponents';
import { ActionsWidget } from './ActionsWidget';
import Calendar from 'react-calendar';
import './Calendar.css';
import { DoSidebar } from './DoSidebar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function DoPage() {
  return (
    <PageMainContainer>
      <PageMainRow>
        <PageSidebarContainerCol>
          <DoSidebar />
        </PageSidebarContainerCol>
        <PageMainContentCol>
          <Row>
            <Col xs="6">
              <Calendar />
              <ActionsWidget />
            </Col>
            <Col xs="6">
              <div>Other stuff</div>
            </Col>
          </Row>
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
}
