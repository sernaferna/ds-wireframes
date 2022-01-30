import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import { CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

export const EditPlan = () => {
  return (
    <Container fluid>
      <h1>Edit Plan</h1>
      <Row>
        <Col className="plan-edit-details">
          <Form>
            <Row className="mb-2">
              <Col xs="2">
                <Form.Label htmlFor="planName">Name:</Form.Label>
              </Col>
              <Col xs="6">
                <Form.Control size="sm" id="planName" placeholder="Plan Name" defaultValue="Genesis in a Year" />
              </Col>
              <Col xs="2">
                <Form.Label htmlFor="numWeeks">Number of Weeks:</Form.Label>
              </Col>
              <Col xs="1">
                <Form.Control size="sm" id="numWeeks" placeholder="52" defaultValue="52" />
              </Col>
              <Col xs="1">
                <DropdownButton variant="outline-secondary" as={ButtonGroup} title="Presets">
                  <Dropdown.Item eventKey="1">2 weeks</Dropdown.Item>
                  <Dropdown.Item eventKey="1">4 weeks</Dropdown.Item>
                  <Dropdown.Item eventKey="1">26 weeks (6 months)</Dropdown.Item>
                  <Dropdown.Item eventKey="1">52 weeks (1 year)</Dropdown.Item>
                  <Dropdown.Item eventKey="1">156 weeks (3 years)</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col xs="2">
                <Form.Label htmlFor="planDescription">Description:</Form.Label>
              </Col>
              <Col xs="8">
                <Form.Control
                  id="planDescription"
                  size="sm"
                  as="textarea"
                  placeholder="Plan Description"
                  defaultValue="The entire book of Genesis in a year"
                />
              </Col>
              <Col xs="2">
                <Form.Check type="checkbox" label="Admin Plan" aria-describedby="isPlanAdminHelpText" />
                <Form.Text id="isPlanAdminHelpText" muted>
                  Available to all users
                </Form.Text>
                <Form.Check type="checkbox" label="Include Apocrypha" aria-describedby="isApocHelpText" />
                <Form.Text id="isApocHelpText" muted>
                  Include Apocryphal books
                </Form.Text>
              </Col>
            </Row>

            <Container className="p-5 bg-light mt-3">
              <Form.Label htmlFor="reference" className="h2">
                Passage(s)
              </Form.Label>
              <InputGroup>
                <Form.Control
                  id="reference"
                  size="lg"
                  defaultValue="Genesis 1-50"
                  aria-describedby="referenceHelpText"
                />
                <Button size="lg" variant="outline-primary">
                  Reset and Load All
                </Button>
              </InputGroup>
              <Form.Text id="referenceHelpText" muted>
                Changing this value resets all days below
              </Form.Text>

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
    </Container>
  );
};
