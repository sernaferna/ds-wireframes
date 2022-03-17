import React, { useState, useCallback, useEffect, ChangeEvent, FormEvent, FocusEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Verse } from '@devouringscripture/common';
import {
  getFormattedReference,
  isReferenceValid,
  getRefForVerses,
  getOSISForReference,
} from '@devouringscripture/refparse';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { DayForPlan, generateDayList, getValue } from './Helpers';
import { useLazyGetVersesForOSISQuery } from '../../../services/VapiService';
import { initialPlanValues, validate } from './EditPlanValidations';
import { WeeksDropdown } from './WeeksDropdown';
import { RenderWeeks } from './RenderWeeks';
import { v4 as uuidv4 } from 'uuid';

export const EditPlan = () => {
  const [showWarning, setShowWarning] = useState(true);
  const userResponse = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [versesTrigger, versesResult] = useLazyGetVersesForOSISQuery();
  const [values, setValues] = useState(initialPlanValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [days, setDays] = useState<DayForPlan[]>([]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, type } = event.currentTarget;
      let value = event.currentTarget.value;

      if (type === 'checkbox') {
        value = event.currentTarget.checked ? 'on' : 'off';
      }

      //update value; keep number fields as number
      setValues({ ...values, [name]: getValue(type, value) });

      //indicate the field was touched
      setTouched({ ...touched, [name]: true });
    },
    [setValues, setTouched, touched, values]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.currentTarget;

      //remove previous errors
      const { [name]: removedError, ...rest } = errors as any;

      const error: string | null = validate[name](value);

      //validate the field if it has been touched
      setErrors({
        ...rest,
        ...(error && { [name]: touched[name] && error }),
      });
    },
    [errors, setErrors, touched]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      //validate the form
      const formValidation: any = Object.keys(values).reduce((acc: any, key): any => {
        const newError = validate[key]((values as any)[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        };
      });
      setErrors(formValidation.errors);
      setTouched(formValidation.touched);

      if (
        !Object.values(formValidation.errors).length && //errors object is empty
        Object.values(formValidation.touched).length === Object.values(values).length && // all items were touched
        Object.values(formValidation.touched).every((t) => t === true) //every touched field is true
      ) {
        console.log(JSON.stringify(values, null, 2)); // TODO
      }
    },
    [values, setErrors, setTouched]
  );

  const regenerateDayList = useCallback(() => {
    let verses: Verse[] | undefined = undefined;

    if (
      versesResult &&
      !versesResult.error &&
      !versesResult.isLoading &&
      !versesResult.isUninitialized &&
      values.reference.trim().length > 0
    ) {
      verses = versesResult.data!.slice();
    }

    const listOfDays = generateDayList({
      includeWeekends: values.includeWeekends,
      isFreeform: values.isFreeform,
      numWeeks: values.numWeeks,
      verses: verses,
    });

    setDays(listOfDays);
  }, [values.includeWeekends, values.isFreeform, values.numWeeks, values.reference, versesResult]);

  const updateWeeks = useCallback(
    (newValue: number) => {
      setTouched({
        ...touched,
        numWeeks: true,
      });

      setValues({
        ...values,
        numWeeks: newValue,
      });

      regenerateDayList();
    },
    [setValues, setTouched, touched, values, regenerateDayList]
  );

  const fetchVerses = useCallback(() => {
    if (values.reference.trim().length > 0 && isReferenceValid(values.reference)) {
      versesTrigger(values.reference);
    }
  }, [values.reference, versesTrigger]);

  useEffect(() => {
    regenerateDayList();
  }, [versesResult, regenerateDayList]);

  const updateDay = useCallback(
    (update: DayForPlan) => {
      const newList = days.slice();

      for (let i = 0; i < newList.length; i++) {
        if (newList[i].id === update.id) {
          if (newList[i].osis && isReferenceValid(newList[i].osis!)) {
            newList[i].osis = getOSISForReference(update.osis || '');
          } else {
            newList[i].osis = update.osis;
          }
          newList[i].verses = update.verses;
          newList[i].id = uuidv4();
          break;
        }
      }

      setDays(newList);
    },
    [days, setDays]
  );

  const moveVerseUp = useCallback(
    (dayNum: number, cascade: boolean = false) => {
      const newList = days.slice();
      const currentDay = dayNum - 1;

      for (let i = currentDay; i < newList.length; i++) {
        if (cascade || i === currentDay) {
          if (newList[i + 1].verses === undefined || newList[i + 1].verses!.length < 1) {
            break;
          }
          if (newList[i].verses === undefined) {
            newList[i].verses = [];
          }
          newList[i].verses!.push(newList[i + 1].verses![0]);
          newList[i].osis = getOSISForReference(getRefForVerses(newList[i].verses));
          newList[i].id = uuidv4();
          newList[i + 1].verses!.splice(0, 1);
          newList[i + 1].osis = getOSISForReference(getRefForVerses(newList[i + 1].verses));
          newList[i + 1].id = uuidv4();
        }
      }

      setDays(newList);
    },
    [days, setDays]
  );

  const moveVerseDown = useCallback(
    (dayNum: number, cascade: boolean = false) => {
      const newList = days.slice();
      const currentDay = dayNum - 1;

      for (let i = currentDay; i > 0; i--) {
        if (cascade || i === currentDay) {
          if (newList[i - 1].verses === undefined || newList[i - 1].verses!.length < 1) {
            break;
          }
          if (newList[i].verses === undefined) {
            newList[i].verses = [];
          }
          newList[i].verses!.unshift(newList[i - 1].verses!.pop() as Verse);
          newList[i].osis = getOSISForReference(getRefForVerses(newList[i].verses));
          newList[i].id = uuidv4();
          newList[i - 1].osis = getOSISForReference(getRefForVerses(newList[i - 1].verses));
          newList[i - 1].id = uuidv4();
        }
      }

      setDays(newList);
    },
    [days, setDays]
  );

  if (userResponse.isLoading) {
    return <LoadingMessage />;
  }
  if (userResponse.error) {
    return <ErrorLoadingDataMessage />;
  }

  return (
    <Container fluid>
      <h1>Edit Plan</h1>
      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Col className="plan-edit-details">
            <Container className="p-3 bg-light">
              <Alert variant="warning" dismissible show={showWarning} onClose={() => setShowWarning(false)}>
                Altering <b>these settings</b> will reset weeks and days set below.
              </Alert>

              <Row className="mb-2">
                <Col xs="5">
                  <Form.Label htmlFor="planName">Name:</Form.Label>
                  <Form.Control
                    name="planName"
                    aria-label="Name"
                    value={values.planName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="sm"
                    id="planName"
                    placeholder="Plan Name"
                    type="text"
                    isValid={!errors['planName'] && !!touched['planName']}
                    isInvalid={!!errors['planName'] && !!touched['planName']}
                  />
                  <Form.Control.Feedback type="invalid">{errors['planName']}</Form.Control.Feedback>
                </Col>
                <Col xs="3">
                  <Form.Label htmlFor="numWeeks">Weeks:</Form.Label>
                  <Form.Control
                    className="alter-content-field"
                    size="sm"
                    id="numWeeks"
                    name="numWeeks"
                    placeholder="52"
                    value={values.numWeeks}
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      fetchVerses();
                    }}
                    type="number"
                    isValid={!errors['numWeeks'] && !!touched['numWeeks']}
                    isInvalid={!!errors['numWeeks'] && !!touched['numWeeks']}
                  />
                  <Form.Control.Feedback type="invalid">{errors['numWeeks']}</Form.Control.Feedback>
                  <DropdownButton
                    className="alter-content-field"
                    variant="outline-secondary"
                    as={ButtonGroup}
                    title="Presets"
                    size="sm"
                  >
                    <WeeksDropdown numWeeks={2} updateWeeksCallback={updateWeeks} />
                    <WeeksDropdown numWeeks={4} updateWeeksCallback={updateWeeks} />
                    <WeeksDropdown numWeeks={26} updateWeeksCallback={updateWeeks} />
                    <WeeksDropdown numWeeks={52} updateWeeksCallback={updateWeeks} />
                    <WeeksDropdown numWeeks={156} updateWeeksCallback={updateWeeks} />
                  </DropdownButton>
                </Col>
                <Col xs="2">
                  <Form.Label htmlFor="version">Version:</Form.Label>
                  <Form.Control
                    size="sm"
                    id="version"
                    name="version"
                    placeholder="1.0.0"
                    value={values.version}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isValid={!errors['version'] && !!touched['version']}
                    isInvalid={!!errors['version'] && !!touched['version']}
                  />
                  <Form.Control.Feedback type="invalid">{errors['version']}</Form.Control.Feedback>
                </Col>
                <Col xs="2">
                  <Form.Check
                    name="includeWeekends"
                    type="checkbox"
                    label="Include weekends?"
                    checked={values.includeWeekends}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    name="description"
                    size="sm"
                    as="textarea"
                    placeholder="Plan Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={!errors['description'] && !!touched['description']}
                    isInvalid={!!errors['description'] && !!touched['description']}
                  />
                  <Form.Control.Feedback type="invalid">{errors['description']}</Form.Control.Feedback>
                </Col>
                <Col xs="2">
                  {userResponse.data!.isAdmin ? (
                    <>
                      <Form.Check
                        name="isAdmin"
                        id="isAdmin"
                        type="checkbox"
                        label="Admin Plan"
                        aria-describedby="isPlanAdminHelpText"
                        checked={values.isAdmin}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    checked={values.includeApocrypha}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                checked={values.isFreeform}
                onChange={handleChange}
                onBlur={(e) => {
                  handleBlur(e);
                  if (!e.currentTarget.checked) {
                    fetchVerses();
                  }
                }}
              />

              {!values.isFreeform ? (
                <>
                  <Form.Label htmlFor="reference" className="h2">
                    Passage(s)
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      className="alter-content-field"
                      id="reference"
                      name="reference"
                      size="lg"
                      placeholder="Genesis 1-50"
                      value={values.reference}
                      isValid={!!touched['reference'] && !errors['reference']}
                      isInvalid={!!touched['reference'] && !!errors['reference']}
                      onBlur={(e) => {
                        const newRef = getFormattedReference(e.currentTarget.value);
                        e.currentTarget.value = newRef;
                        values.reference = newRef;
                        handleBlur(e);
                      }}
                      onChange={handleChange}
                    />
                    <Button
                      size="lg"
                      variant="outline-warning"
                      onClick={fetchVerses}
                      disabled={!touched['reference'] && !!errors['reference']}
                    >
                      Reset and Load All
                    </Button>
                    <Form.Control.Feedback type="invalid">{errors['reference']}</Form.Control.Feedback>
                  </InputGroup>
                </>
              ) : (
                ''
              )}
              <RenderWeeks
                days={days}
                includeWeekends={values.includeWeekends}
                isFreeform={values.isFreeform}
                upFunc={moveVerseUp}
                downFunc={moveVerseDown}
                update={updateDay}
              />
            </Container>
          </Col>
          <Col className="plan-edit-sidebar">
            <div className="sidebar-content">
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Save
                </Button>
                {userResponse.data!.isAdmin ? (
                  <Button onClick={() => {}} variant="success">
                    Publish
                  </Button>
                ) : (
                  <></>
                )}
                <Button onClick={() => {}} variant="danger">
                  New
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
