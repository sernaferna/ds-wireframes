import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';

export const EditPlan = () => {
  return (
    <>
      <h1>Edit Plan</h1>
      <Row>
        <Col className="plan-edit-details">
          <Form>
            <Row className="mb-2">
              <Col xs="1">
                <Form.Label htmlFor="planName">Name:</Form.Label>
              </Col>
              <Col xs="4">
                <Form.Control size="sm" id="planName" placeholder="Plan Name" />
              </Col>
              <Col xs="1">
                <Form.Label htmlFor="numWeeks">Number of Weeks:</Form.Label>
              </Col>
              <Col xs="1">
                <Form.Control size="sm" id="numWeeks" placeholder="52" />
              </Col>
              <Col xs="5">
                <Button className="mx-2" variant="secondary" size="sm">
                  2 weeks
                </Button>
                <Button className="mx-2" variant="secondary" size="sm">
                  4 weeks
                </Button>
                <Button className="mx-2" variant="secondary" size="sm">
                  26 weeks (6 Months)
                </Button>
                <Button className="mx-2" variant="secondary" size="sm">
                  52 weeks (1 Year)
                </Button>
                <Button className="mx-2" variant="secondary" size="sm">
                  156 weeks (3 Years)
                </Button>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col xs="2">
                <Form.Label htmlFor="planDescription">Description:</Form.Label>
              </Col>
              <Col xs="10">
                <Form.Control id="planDescription" size="sm" as="textarea" placeholder="Plan Description" />
              </Col>
            </Row>

            <Row>
              <Col xs="6">
                <Form.Check type="checkbox" label="Admin Plan" />
                <Form.Text id="isPlanAdminHelpText" muted>
                  Make available to all Devouring Scripture users; when not checked, this is a personal plan for the
                  current user only
                </Form.Text>
              </Col>
              <Col xs="6">
                <Form.Check type="checkbox" label="Include Apocrypha" />
                <Form.Text id="isPlanAdminHelpText" muted>
                  Include Apocryphal books in the Reading Plan
                </Form.Text>
              </Col>
            </Row>

            <Container className="p-5 bg-light mt-3">
              <h2 className="mt-3">Week 1</h2>
              <InputGroup>
                <Form.Control defaultValue="Genesis 1:1-31" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
              <InputGroup>
                <Form.Control defaultValue="Genesis 2:1-25" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
              <InputGroup>
                <Form.Control defaultValue="Genesis 3:1-24" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
              <InputGroup>
                <Form.Control defaultValue="Genesis 4:1-26" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
              <InputGroup>
                <Form.Control defaultValue="Genesis 5:1-32" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
              <InputGroup>
                <Form.Control defaultValue="Genesis 6:1-22" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
              <InputGroup>
                <Form.Control defaultValue="Genesis 7:1-24" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>

              <h2 className="mt-3">Week 2</h2>
              <InputGroup>
                <Form.Control defaultValue="Genesis 1:1-31" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
              <InputGroup>
                <Form.Control defaultValue="Genesis 2:1-25" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
              <InputGroup>
                <Form.Control defaultValue="Genesis 3:1-24" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
              <InputGroup>
                <Form.Control defaultValue="Genesis 4:1-26" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
              <InputGroup>
                <Form.Control defaultValue="Genesis 5:1-32" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
              <InputGroup>
                <Form.Control defaultValue="Genesis 6:1-22" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
              <InputGroup>
                <Form.Control defaultValue="Genesis 7:1-24" />
                <Button variant="outline-secondary">
                  <CaretUpFill />
                </Button>
                <Button variant="outline-secondary">
                  <CaretDownFill />
                </Button>
              </InputGroup>
            </Container>
          </Form>
        </Col>
        <Col className="plan-edit-sidebar">
          <div className="sidebar-content">
            <div className="d-grid gap-2">
              <Button variant="primary">Save</Button>
              <Button variant="success">Publish</Button>
            </div>

            <h2 className="mt-3">History of Changes</h2>
            <Stack gap={2}>
              <div className="bg-light border">Created</div>
              <div className="bg-light border">Set # Weeks</div>
              <div className="bg-light border">Adusted week</div>
            </Stack>
          </div>
        </Col>
      </Row>
    </>
  );
};
