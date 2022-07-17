import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AllNotes } from './AllNotes';
import { WriteEditor } from './WriteEditor';
import { WriteSidebar } from './WriteSidebar';

/**
 * Main page/component for the **Write** section of the app
 */
export const WritePage = () => {
  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <WriteSidebar />
        </Col>
        <Col className="page-main-content-col">
          <Row>
            <Col xs="12" xl="9">
              <WriteEditor />
            </Col>
            <Col xs="12" xl="3">
              <AllNotes />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
