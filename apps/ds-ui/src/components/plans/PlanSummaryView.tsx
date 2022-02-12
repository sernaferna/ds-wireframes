import React from 'react';
import { UserPlan } from '@devouringscripture/common';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Journal, JournalX } from 'react-bootstrap-icons';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import { getToastManager, ToastType, TOAST_FADE_TIME } from '../common/toasts/ToastManager';
import Badge from 'react-bootstrap/Badge';

interface PlanSummaryViewAttrs {
  userPlan: UserPlan;
}
export const PlanSummaryView = ({ userPlan }: PlanSummaryViewAttrs) => {
  const { plan } = userPlan;

  const apocPopover = (
    <Popover id="apocPopover">
      <Popover.Body>
        {plan.includesApocrypha ? 'This plan includes apocryphal books' : 'This plan does not include apocryphal books'}
      </Popover.Body>
    </Popover>
  );

  const apocIcon = (
    <OverlayTrigger trigger={['hover', 'focus']} overlay={apocPopover}>
      {plan.includesApocrypha ? <Journal /> : <JournalX />}
    </OverlayTrigger>
  );

  const buttonClicked = () => {
    getToastManager().show({
      title: 'Not implemented',
      content: 'Feature not yet implemented',
      duration: TOAST_FADE_TIME,
      type: ToastType.Danger,
    });
  };

  return (
    <Alert variant={plan.isAdmin ? 'primary' : 'info'} className="plan-summary-view">
      <Alert.Heading>{plan.name}</Alert.Heading>
      <Row>
        <Col xs="1">{apocIcon}</Col>
        <Col xs="11">
          <p>{plan.description}</p>
        </Col>
      </Row>

      <Row>
        <Col className="version-col">
          <Badge bg={plan.isAdmin ? 'primary' : 'info'}>v{plan.version}</Badge>
        </Col>
        <Col className="num-weeks-col">
          <Badge bg={plan.isAdmin ? 'primary' : 'info'}>{plan.length} weeks</Badge>
        </Col>
        <Col className="percent-complete-col">
          {userPlan.percentageComplete ? (
            <ProgressBar
              now={userPlan.percentageComplete * 100}
              label={`${userPlan.percentageComplete * 100}%`}
              variant={plan.isAdmin ? 'primary' : 'info'}
            />
          ) : (
            <i>Not subscribed</i>
          )}
        </Col>
      </Row>
      <Row className="button-row">
        <Col className="edit-col">
          {plan.isAdmin ? (
            <Button variant="primary" onClick={buttonClicked}>
              Edit
            </Button>
          ) : (
            ''
          )}
        </Col>
        <Col className="join-col">
          {userPlan.percentageComplete ? (
            <Button variant="danger" onClick={buttonClicked}>
              Leave
            </Button>
          ) : (
            <Button variant="primary" onClick={buttonClicked}>
              Start
            </Button>
          )}
        </Col>
        <Col className="deleteCol">
          {plan.isAdmin ? (
            ''
          ) : (
            <Button variant="danger" onClick={buttonClicked}>
              Delete
            </Button>
          )}
        </Col>
      </Row>
    </Alert>
  );
};
