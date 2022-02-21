import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { getToastManager, ToastType, TOAST_FADE_TIME } from '../../common/toasts/ToastManager';
import { RenderDay } from './RenderDay';
import { isVersionValid } from '@devouringscripture/common';
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';

const schema = yup.object({
  name: yup.string().required('Name required'),
  description: yup.string().required('Description required'),
  numWeeks: yup.number().required('Valid length of plan required').positive().integer(),
  version: yup
    .string()
    .required()
    .test('valid-version', 'Invalid version; must be #.#.# format', (value) => {
      if (value === undefined) {
        return false;
      }

      return isVersionValid(value);
    }),
});
type ValuesSchema = yup.InferType<typeof schema>;

export const EditPlan = () => {
  const [isFreeform, setIsFreeform] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  const initialValues: ValuesSchema = {
    name: '',
    description: '',
    numWeeks: 52,
    version: '1.0.0',
  };

  const incrementorClicked = (dayNum: number) => {
    getToastManager().show({
      title: 'Not implemented yet',
      content: `Increment clicked for day ${dayNum}`,
      duration: TOAST_FADE_TIME,
      type: ToastType.Info,
    });
  };

  const decrementerClicked = (dayNum: number) => {
    getToastManager().show({
      title: 'Not implemented yet',
      content: `Decrement clicked for day ${dayNum}`,
      duration: TOAST_FADE_TIME,
      type: ToastType.Info,
    });
  };

  const handleSubmit = (values: ValuesSchema) => {
    getToastManager().show({
      title: 'Not implemented',
      content: `Submit not implemented yet: ${values.name}`,
      duration: TOAST_FADE_TIME,
      type: ToastType.Info,
    });
  };

  return (
    <Container fluid>
      <h1>Edit Plan</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={(values: ValuesSchema) => {
          handleSubmit(values);
        }}
      >
        {(formikProps: FormikProps<ValuesSchema>) => (
          <Form noValidate onSubmit={formikProps.handleSubmit}>
            <Row>
              <Col className="plan-edit-details">
                <Container className="p-3 bg-light">
                  <Alert variant="warning" dismissible show={showWarning} onClose={() => setShowWarning(false)}>
                    Altering <b>these settings</b> will reset weeks and days set below.
                  </Alert>

                  <Row className="mb-2">
                    <Col xs="1">
                      <Form.Label htmlFor="name">Name:</Form.Label>
                    </Col>
                    <Col xs="4">
                      <Form.Control
                        name="name"
                        aria-label="Name"
                        value={formikProps.values.name}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        size="sm"
                        id="name"
                        placeholder="Plan Name"
                        type="text"
                        isValid={!formikProps.errors.name && !!formikProps.touched.name}
                        isInvalid={!!formikProps.errors.name && !!formikProps.touched.name}
                      />
                      <Form.Control.Feedback type="invalid">{formikProps.errors.name}</Form.Control.Feedback>
                    </Col>
                    <Col xs="1">
                      <Form.Label htmlFor="numWeeks">Weeks:</Form.Label>
                    </Col>
                    <Col xs="2">
                      <Form.Control
                        className="alter-content-field"
                        size="sm"
                        id="numWeeks"
                        name="numWeeks"
                        placeholder="52"
                        value={formikProps.values.numWeeks}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        type="text"
                        isValid={!formikProps.errors.numWeeks}
                        isInvalid={!!formikProps.errors.numWeeks}
                      />
                      <Form.Control.Feedback type="invalid">{formikProps.errors.numWeeks}</Form.Control.Feedback>
                    </Col>
                    <Col xs="1">
                      <DropdownButton
                        className="alter-content-field"
                        variant="outline-secondary"
                        as={ButtonGroup}
                        title="Presets"
                      >
                        <Dropdown.Item
                          eventKey="2"
                          onClick={() => {
                            formikProps.setFieldValue('numWeeks', 2);
                          }}
                        >
                          2 weeks
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="4"
                          onClick={() => {
                            formikProps.setFieldValue('numWeeks', 4);
                          }}
                        >
                          4 weeks
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="26"
                          onClick={() => {
                            formikProps.setFieldValue('numWeeks', 26);
                          }}
                        >
                          26 weeks (6 months)
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="52"
                          onClick={() => {
                            formikProps.setFieldValue('numWeeks', 52);
                          }}
                        >
                          52 weeks (1 year)
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="156"
                          onClick={() => {
                            formikProps.setFieldValue('numWeeks', 156);
                          }}
                        >
                          156 weeks (3 years)
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                    <Col xs="1">
                      <Form.Label htmlFor="version">Version:</Form.Label>
                    </Col>
                    <Col xs="1">
                      <Form.Control
                        size="sm"
                        id="version"
                        name="version"
                        placeholder="1.0.0"
                        value={formikProps.values.version}
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                        isValid={!formikProps.errors.version && !!formikProps.touched.version}
                        isInvalid={!!formikProps.errors.version && !!formikProps.touched.version}
                      />
                      <Form.Control.Feedback type="invalid">{formikProps.errors.version}</Form.Control.Feedback>
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col xs="1">
                      <Form.Label htmlFor="description">Description:</Form.Label>
                    </Col>
                    <Col xs="9">
                      <Form.Control
                        id="description"
                        size="sm"
                        as="textarea"
                        placeholder="Plan Description"
                        value={formikProps.values.description}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        isValid={!formikProps.errors.description && !!formikProps.touched.description}
                        isInvalid={!!formikProps.errors.description && !!formikProps.touched.description}
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
                </Container>

                <Container className="p-5 mt-3">
                  <Form.Check
                    className="alter-content-field"
                    type="switch"
                    id="freeform"
                    label="Free-form entries?"
                    checked={isFreeform}
                    onChange={() => {
                      setIsFreeform(!isFreeform);
                    }}
                  />

                  {!isFreeform ? (
                    <>
                      <Form.Label htmlFor="reference" className="h2">
                        Passage(s)
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          className="alter-content-field"
                          id="reference"
                          size="lg"
                          defaultValue="Genesis 1-50"
                          aria-describedby="referenceHelpText"
                        />
                        <Button size="lg" variant="outline-warning">
                          Reset and Load All
                        </Button>
                      </InputGroup>
                    </>
                  ) : (
                    ''
                  )}

                  <h2 className="mt-3">Week 1</h2>
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    dayNum={0}
                    maxDays={14}
                    isFreeform={isFreeform}
                    verses={[
                      { versenum: 1, osis: 'Gen.1.1', apocrypha: false },
                      { versenum: 2, osis: 'Gen.1.2', apocrypha: false },
                      { versenum: 3, osis: 'Gen.1.3', apocrypha: false },
                      { versenum: 4, osis: 'Gen.1.4', apocrypha: false },
                      { versenum: 5, osis: 'Gen.1.5', apocrypha: false },
                      { versenum: 6, osis: 'Gen.1.6', apocrypha: false },
                      { versenum: 7, osis: 'Gen.1.7', apocrypha: false },
                      { versenum: 8, osis: 'Gen.1.8', apocrypha: false },
                      { versenum: 9, osis: 'Gen.1.9', apocrypha: false },
                      { versenum: 10, osis: 'Gen.1.10', apocrypha: false },
                      { versenum: 11, osis: 'Gen.1.11', apocrypha: false },
                      { versenum: 12, osis: 'Gen.1.12', apocrypha: false },
                      { versenum: 13, osis: 'Gen.1.13', apocrypha: false },
                      { versenum: 14, osis: 'Gen.1.14', apocrypha: false },
                      { versenum: 15, osis: 'Gen.1.15', apocrypha: false },
                      { versenum: 16, osis: 'Gen.1.16', apocrypha: false },
                      { versenum: 17, osis: 'Gen.1.17', apocrypha: false },
                      { versenum: 18, osis: 'Gen.1.18', apocrypha: false },
                      { versenum: 19, osis: 'Gen.1.19', apocrypha: false },
                      { versenum: 20, osis: 'Gen.1.20', apocrypha: false },
                      { versenum: 21, osis: 'Gen.1.21', apocrypha: false },
                      { versenum: 22, osis: 'Gen.1.22', apocrypha: false },
                      { versenum: 23, osis: 'Gen.1.23', apocrypha: false },
                      { versenum: 24, osis: 'Gen.1.24', apocrypha: false },
                      { versenum: 25, osis: 'Gen.1.25', apocrypha: false },
                      { versenum: 26, osis: 'Gen.1.26', apocrypha: false },
                      { versenum: 27, osis: 'Gen.1.27', apocrypha: false },
                      { versenum: 28, osis: 'Gen.1.28', apocrypha: false },
                      { versenum: 29, osis: 'Gen.1.29', apocrypha: false },
                      { versenum: 30, osis: 'Gen.1.30', apocrypha: false },
                      { versenum: 31, osis: 'Gen.1.31', apocrypha: false },
                    ]}
                  />
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={1}
                    isFreeform={isFreeform}
                    osis="Genesis 2:1-25"
                  />
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={2}
                    isFreeform={isFreeform}
                    osis="Genesis 3:1-24"
                  />
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={3}
                    isFreeform={isFreeform}
                    osis="Genesis 4:1-26"
                  />
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={4}
                    isFreeform={isFreeform}
                    osis="Genesis 5:1-32"
                  />
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={5}
                    isFreeform={isFreeform}
                    osis="Genesis 6:1-22"
                  />
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={6}
                    isFreeform={isFreeform}
                    osis="Genesis 7:1-24"
                  />

                  <h2 className="mt-3">Week 2</h2>
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={7}
                    isFreeform={isFreeform}
                    osis="Genesis 1:1-31"
                  />
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={8}
                    isFreeform={isFreeform}
                    osis="Genesis 2:1-25"
                  />
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={9}
                    isFreeform={isFreeform}
                    osis="Genesis 3:1-24"
                  />
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={10}
                    isFreeform={isFreeform}
                    osis="Genesis 4:1-26"
                  />
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={11}
                    isFreeform={isFreeform}
                    osis="Genesis 5:1-32"
                  />
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={12}
                    isFreeform={isFreeform}
                    osis="Genesis 6:1-22"
                  />
                  <RenderDay
                    incrementFunction={incrementorClicked}
                    decrementFunction={decrementerClicked}
                    maxDays={14}
                    dayNum={13}
                    isFreeform={isFreeform}
                    osis="Genesis 7:1-24"
                  />
                </Container>
              </Col>
              <Col className="plan-edit-sidebar">
                <div className="sidebar-content">
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" disabled={!formikProps.isValid || !formikProps.dirty}>
                      Save
                    </Button>
                    <Button variant="success" disabled={!formikProps.isValid || !formikProps.dirty}>
                      Publish
                    </Button>
                    <Button variant="danger">New</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
