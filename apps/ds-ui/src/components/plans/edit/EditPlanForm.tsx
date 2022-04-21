import React, { useState, ChangeEvent, FocusEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import { PlanValues } from './EditPlanValidations';
import { DayForPlan } from './Helpers';
import { WeeksDropdown } from './WeeksDropdown';
import { RenderWeeks } from './RenderWeeks';
import { UserAttributes, getFormattedReference, PlanStatus } from '@devouringscripture/common';

interface IEditPlanForm {
  user: UserAttributes;
  values: PlanValues;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  days: DayForPlan[];
  handleSubmit(): void;
  handleSave(): void;
  handleReset(): void;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  fetchVerses(): void;
  updateWeeks(newValue: number): void;
  moveVerseUp(dayNum: number, cascade?: boolean): void;
  moveVerseDown(dayNum: number, cascade?: boolean): void;
  updateDay(update: DayForPlan): void;
}
export const EditPlanForm = ({
  user,
  values,
  errors,
  touched,
  days,
  handleSubmit,
  handleSave,
  handleReset,
  handleChange,
  handleBlur,
  fetchVerses,
  updateWeeks,
  moveVerseUp,
  moveVerseDown,
  updateDay,
}: IEditPlanForm) => {
  const [showWarning, setShowWarning] = useState(true);

  const hideWarning = () => {
    setShowWarning(false);
  };

  const handleNumWeeksBlur = (e: any) => {
    handleBlur(e);
    fetchVerses();
  };

  const handleFreeformBlur = (e: FocusEvent<HTMLInputElement>) => {
    handleBlur(e);
    if (!e.currentTarget.checked) {
      fetchVerses();
    }
  };

  const handleReferenceBlur = (e: FocusEvent<HTMLInputElement>) => {
    const newRef = getFormattedReference(e.currentTarget.value);
    e.currentTarget.value = newRef;
    values.reference = newRef;
    handleBlur(e);
  };

  return (
    <Form noValidate>
      <Row>
        <Col xs="10">
          <Container className="bg-light p-3">
            <Alert variant="warning" dismissible show={showWarning} onClose={hideWarning}>
              Altering <b>highlighted settings</b> will reset weeks and days below, overwriting previous changes.
            </Alert>

            <Row className="mb-2">
              <Col xs="12" md="6" xl="5" className="mb-2">
                <Form.Label htmlFor="planName">Name:</Form.Label>
                <Form.Control
                  name="planName"
                  aria-label="Name"
                  value={values.planName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="planName"
                  placeholder="Plan Name"
                  type="text"
                  isValid={!errors['planName'] && !!touched['planName']}
                  isInvalid={!!errors['planName'] && !!touched['planName']}
                />
                <Form.Control.Feedback type="invalid">{errors['planName']}</Form.Control.Feedback>
              </Col>
              <Col xs="12" md="6" xl="3" className="mb-2">
                <Form.Label htmlFor="numWeeks">Weeks:</Form.Label>
                <Form.Control
                  className="alter-content-field"
                  id="numWeeks"
                  name="numWeeks"
                  placeholder="52"
                  value={values.numWeeks}
                  onChange={handleChange}
                  onBlur={handleNumWeeksBlur}
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
              <Col xs="12" md="6" xl="2" className="mb-2">
                <Form.Label htmlFor="version">Version:</Form.Label>
                <Form.Control
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
              <Col xs="12" md="6" xl="2" className="mb-2">
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

            <Row>
              <Col xs="12" md="2">
                <Form.Label htmlFor="description">Description:</Form.Label>
              </Col>
              <Col xs="12" md="10" lg="6" xl="8">
                <Form.Control
                  id="description"
                  name="description"
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
              <Col xs="12" lg="4" xl="2">
                {user.isAdmin ? (
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
                      disabled={values.status === PlanStatus.Published && values.isAdmin}
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
              onBlur={handleFreeformBlur}
            />

            {!values.isFreeform ? (
              <div>
                <Form.Label htmlFor="reference" className="h4">
                  Passage(s)
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    id="reference"
                    name="reference"
                    placeholder="Genesis 1-50"
                    value={values.reference}
                    isValid={!!touched['reference'] && !errors['reference']}
                    isInvalid={!!touched['reference'] && !!errors['reference']}
                    onBlur={handleReferenceBlur}
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-warning"
                    onClick={fetchVerses}
                    disabled={!touched['reference'] && !!errors['reference']}
                  >
                    Reset and Load All
                  </Button>
                  <Form.Control.Feedback type="invalid">{errors['reference']}</Form.Control.Feedback>
                </InputGroup>
              </div>
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
        <Col xs="2">
          <div className="sticky-top">
            <div className="d-grid gap-2">
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
              {user.isAdmin ? (
                <Button variant="primary" onClick={handleSubmit}>
                  Publish
                </Button>
              ) : (
                <></>
              )}
              <Button variant="danger" onClick={handleReset}>
                New
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
