import React, { useState, useMemo, Reducer, useReducer } from 'react';
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
import { isVersionValid, Verse } from '@devouringscripture/common';
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { DayForPlan, generateDayList, RenderedDays } from './Helpers';

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

const handlePublish = () => {
  getToastManager().show({
    title: 'Not implemented',
    content: 'Publish not implemented yet',
    duration: TOAST_FADE_TIME,
    type: ToastType.Info,
  });
};

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
  isAdmin: yup.boolean(),
  includeApocrypha: yup.boolean(),
  includeWeekends: yup.boolean(),
  isFreeform: yup.boolean(),
});
type ValuesSchema = yup.InferType<typeof schema>;

const initialValues: ValuesSchema = {
  name: '',
  description: '',
  numWeeks: 0,
  version: '1.0.0',
  isAdmin: false,
  includeApocrypha: false,
  includeWeekends: true,
  isFreeform: true,
};

interface WeeksDDProps {
  formikProps: FormikProps<ValuesSchema>;
  numWeeks: number;
}
const WeeksDropdown = ({ formikProps, numWeeks }: WeeksDDProps) => {
  const displayString = `${numWeeks} weeks`;

  return (
    <Dropdown.Item
      eventKey={numWeeks}
      onClick={() => {
        formikProps.setFieldValue('numWeeks', numWeeks);
      }}
    >
      {displayString}
    </Dropdown.Item>
  );
};

interface DupState {
  isFreeform: boolean;
  numWeeks: number;
  includeWeekends: boolean;
  verses: Verse[] | undefined;
}

const initialDupState: DupState = {
  isFreeform: false,
  numWeeks: 0,
  includeWeekends: true,
  verses: undefined,
};

enum ReducerActionType {
  SET_FREEFORM,
  SET_NUMWEEKS,
  SET_INCLUDEWEEKENDS,
  SET_VERSES,
}

type SetFreeformAction = {
  type: ReducerActionType.SET_FREEFORM;
  payload: boolean;
};

type SetNumweeksAction = {
  type: ReducerActionType.SET_NUMWEEKS;
  payload: number;
};

type SetIncludeweekendsAction = {
  type: ReducerActionType.SET_INCLUDEWEEKENDS;
  payload: boolean;
};

type SetVersesAction = {
  type: ReducerActionType.SET_VERSES;
  payload: Verse[];
};

type ReducerAction = SetFreeformAction | SetNumweeksAction | SetIncludeweekendsAction | SetVersesAction;

const usePlanReducer: Reducer<DupState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case ReducerActionType.SET_FREEFORM:
      return { ...state, isFreeform: action.payload };
    case ReducerActionType.SET_INCLUDEWEEKENDS:
      return { ...state, includeWeekends: action.payload };
    case ReducerActionType.SET_NUMWEEKS:
      return { ...state, numWeeks: action.payload };
    case ReducerActionType.SET_VERSES:
      return { ...state, verses: action.payload };
  }
};

export const EditPlan = () => {
  const [showWarning, setShowWarning] = useState(true);
  const userResponse = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [dupLocalState, dispatchDupLocalState] = useReducer(usePlanReducer, initialDupState);

  const days: DayForPlan[] = useMemo(() => generateDayList(dupLocalState), [dupLocalState]);

  if (userResponse.isLoading) {
    return <LoadingMessage />;
  }
  if (userResponse.error) {
    return <ErrorLoadingDataMessage />;
  }

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
                    <Col xs="5">
                      <Form.Label htmlFor="name">Name:</Form.Label>
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
                    <Col xs="3">
                      <Form.Label htmlFor="numWeeks">Weeks:</Form.Label>
                      <Form.Control
                        className="alter-content-field"
                        size="sm"
                        id="numWeeks"
                        name="numWeeks"
                        placeholder="52"
                        value={formikProps.values.numWeeks}
                        onChange={(e) => {
                          formikProps.handleChange(e);
                          dispatchDupLocalState({
                            type: ReducerActionType.SET_NUMWEEKS,
                            payload: parseInt(e.currentTarget.value),
                          });
                        }}
                        onBlur={formikProps.handleBlur}
                        type="text"
                        isValid={!formikProps.errors.numWeeks && !!formikProps.touched.numWeeks}
                        isInvalid={!!formikProps.errors.numWeeks && !!formikProps.touched.numWeeks}
                      />
                      <Form.Control.Feedback type="invalid">{formikProps.errors.numWeeks}</Form.Control.Feedback>
                      <DropdownButton
                        className="alter-content-field"
                        variant="outline-secondary"
                        as={ButtonGroup}
                        title="Presets"
                        size="sm"
                      >
                        <WeeksDropdown formikProps={formikProps} numWeeks={2} />
                        <WeeksDropdown formikProps={formikProps} numWeeks={4} />
                        <WeeksDropdown formikProps={formikProps} numWeeks={26} />
                        <WeeksDropdown formikProps={formikProps} numWeeks={52} />
                        <WeeksDropdown formikProps={formikProps} numWeeks={156} />
                      </DropdownButton>
                    </Col>
                    <Col xs="2">
                      <Form.Label htmlFor="version">Version:</Form.Label>
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
                    <Col xs="2">
                      <Form.Check
                        name="includeWeekends"
                        type="checkbox"
                        label="Include weekends?"
                        checked={formikProps.values.includeWeekends}
                        onChange={(e) => {
                          formikProps.handleChange(e);
                          dispatchDupLocalState({
                            type: ReducerActionType.SET_INCLUDEWEEKENDS,
                            payload: e.currentTarget.value === 'true' ? true : false,
                          });
                        }}
                        onBlur={formikProps.handleBlur}
                        className="alter-content-field"
                      />
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
                      <Form.Control.Feedback type="invalid">{formikProps.errors.description}</Form.Control.Feedback>
                    </Col>
                    <Col xs="2">
                      {userResponse.data!.isAdmin ? (
                        <>
                          <Form.Check
                            name="isAdmin"
                            type="checkbox"
                            label="Admin Plan"
                            aria-describedby="isPlanAdminHelpText"
                            checked={formikProps.values.isAdmin}
                            onChange={formikProps.handleChange}
                            onBlur={formikProps.handleBlur}
                          />
                          <Form.Text id="isPlanAdminHelpText" muted>
                            Available to all users
                          </Form.Text>
                        </>
                      ) : (
                        <></>
                      )}
                      <Form.Check
                        name="includeApocrypha"
                        type="checkbox"
                        label="Include Apocrypha"
                        aria-describedby="isApocHelpText"
                        checked={formikProps.values.includeApocrypha}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                      />
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
                    id="isFreeform"
                    name="isFreeform"
                    label="Free-form entries?"
                    checked={formikProps.values.isFreeform}
                    onChange={(e) => {
                      formikProps.handleChange(e);
                      dispatchDupLocalState({
                        type: ReducerActionType.SET_FREEFORM,
                        payload: e.currentTarget.value === 'true' ? true : false,
                      });
                    }}
                    onBlur={formikProps.handleBlur}
                  />

                  {!formikProps.values.isFreeform ? (
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
                  <RenderedDays
                    days={days}
                    includeWeekends={dupLocalState.includeWeekends}
                    isFreeform={dupLocalState.isFreeform}
                    inc={incrementorClicked}
                    dec={decrementerClicked}
                  />
                </Container>
              </Col>
              <Col className="plan-edit-sidebar">
                <div className="sidebar-content">
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" disabled={!formikProps.isValid || !formikProps.dirty}>
                      Save
                    </Button>
                    {userResponse.data!.isAdmin ? (
                      <Button
                        onClick={handlePublish}
                        variant="success"
                        disabled={!formikProps.isValid || !formikProps.dirty}
                      >
                        Publish
                      </Button>
                    ) : (
                      <></>
                    )}
                    <Button onClick={() => formikProps.resetForm()} variant="danger">
                      New
                    </Button>
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
