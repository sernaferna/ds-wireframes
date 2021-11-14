import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { PrayerList } from './PrayerList';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

export class PrayerPage extends React.Component {
  render() {
    return (
      <Container className="0" fluid>
        <Row>
          <Col xs="2">
            <Accordion defaultActiveKey="0" className="accordion-flush">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Prayer List</Accordion.Header>
                <Accordion.Body>
                  <Form.Check type="checkbox" id="showAllCheck" label="Show All" />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col xs="10">
            <PrayerList cards={true} fullList={true} />
          </Col>
        </Row>
      </Container>
    );
  }
}
