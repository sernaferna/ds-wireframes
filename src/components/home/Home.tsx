import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { PrayerList } from '../prayer/PrayerList';
import Accordion from 'react-bootstrap/Accordion';

export class Home extends React.Component {
  render() {
    return (
      <Container className="m-0" fluid>
        <Row>
          <Col xs="2" className="border">
            <Accordion defaultActiveKey="0" className="accordion-flush">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Configuration</Accordion.Header>
                <Accordion.Body>
                  <Form.Check type="checkbox" id="showAllCheck" label="Some Setting" />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion defaultActiveKey="0" className="accordion-flush">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Prayer List</Accordion.Header>
                <Accordion.Body className="p-0">
                  <PrayerList cards={false} fullList={false} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col xs="10" className="border">
            Main
          </Col>
        </Row>
      </Container>
    );
  }
}
