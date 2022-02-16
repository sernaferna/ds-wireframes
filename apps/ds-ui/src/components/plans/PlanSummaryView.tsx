import React from 'react';
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
import { useGetPlansByIdQuery } from '../../services/PlanService';
import {
  useNewInstantiatedPlanMutation,
  useDeleteInstantiatedPlanMutation,
} from '../../services/InstantiatedPlanService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { BaseInstantiatedPlan } from '@devouringscripture/common';

interface PlanSummaryViewAttrs {
  planId: string;
  percentageComplete?: number;
}
export const PlanSummaryView = ({ planId, percentageComplete = undefined }: PlanSummaryViewAttrs) => {
  const { data, error, isLoading } = useGetPlansByIdQuery(planId);
  const [sendNewPlan] = useNewInstantiatedPlanMutation();
  const [sendRemovePlan] = useDeleteInstantiatedPlanMutation();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const apocPopover = (
    <Popover id="apocPopover">
      <Popover.Body>
        {data!.includesApocrypha
          ? 'This plan includes apocryphal books'
          : 'This plan does not include apocryphal books'}
      </Popover.Body>
    </Popover>
  );

  const apocIcon = (
    <OverlayTrigger trigger={['hover', 'focus']} overlay={apocPopover}>
      {data!.includesApocrypha ? <Journal /> : <JournalX />}
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

  const createIP = (planInstanceId: string) => {
    const newPlan: BaseInstantiatedPlan = {
      planInstanceId: planInstanceId,
      percentageComplete: 0,
    };

    sendNewPlan(newPlan);
  };

  const deleteIP = (planInstanceId: string) => {
    sendRemovePlan(planInstanceId);
  };

  return (
    <Alert variant={data!.isAdmin ? 'primary' : 'info'} className="plan-summary-view">
      <Alert.Heading>{data!.name}</Alert.Heading>
      <Row>
        <Col xs="1">{apocIcon}</Col>
        <Col xs="11">
          <p>{data!.description}</p>
        </Col>
      </Row>

      <Row>
        <Col className="version-col">
          <Badge bg={data!.isAdmin ? 'primary' : 'info'}>v{data!.version}</Badge>
        </Col>
        <Col className="num-weeks-col">
          <Badge bg={data!.isAdmin ? 'primary' : 'info'}>{data!.length} weeks</Badge>
        </Col>
        <Col className="percent-complete-col">
          {percentageComplete !== undefined ? (
            <ProgressBar
              now={percentageComplete * 100}
              label={`${percentageComplete * 100}%`}
              variant={data!.isAdmin ? 'primary' : 'info'}
            />
          ) : (
            <i>Not subscribed</i>
          )}
        </Col>
      </Row>
      <Row className="button-row">
        <Col className="edit-col">
          {data!.isAdmin ? (
            <Button variant="primary" onClick={buttonClicked}>
              Edit
            </Button>
          ) : (
            ''
          )}
        </Col>
        <Col className="join-col">
          {percentageComplete !== undefined ? (
            <Button
              variant="danger"
              onClick={() => {
                deleteIP(data!.planInstanceId);
              }}
            >
              Leave
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                createIP(data!.planInstanceId);
              }}
            >
              Start
            </Button>
          )}
        </Col>
        <Col className="deleteCol">
          {data!.isAdmin ? (
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
