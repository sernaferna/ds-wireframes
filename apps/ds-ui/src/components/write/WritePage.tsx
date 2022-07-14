import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { WriteSidebar } from './WriteSidebar';

export const WritePage = () => {
  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <WriteSidebar />
        </Col>
        <Col className="page-main-content-col">
          <Row>
            <Col xs="12" xl="7">
              <h4>Editor</h4>
            </Col>
            <Col xs="12" xl="4">
              <h4>Previous posts</h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
