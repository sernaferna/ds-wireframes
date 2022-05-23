import React from 'react';
import { HomeSidebar } from './HomeSidebar';
import { Col, Row, Container } from 'react-bootstrap';

export const Home = () => {
  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <HomeSidebar />
        </Col>
        <Col className="page-main-content-col">
          <div>HOME</div>
        </Col>
      </Row>
    </Container>
  );
};
