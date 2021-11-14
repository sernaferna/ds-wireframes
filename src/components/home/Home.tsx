import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { PrayerList } from '../prayer/PrayerList';

export class Home extends React.Component {
  render() {
    return (
      <Container className="m-0" fluid>
        <Row>
          <Col xs="2" className="border">
            Sidebar
          </Col>
          <Col xs="10" className="border">
            Main
          </Col>
        </Row>
      </Container>
    );
  }
}
