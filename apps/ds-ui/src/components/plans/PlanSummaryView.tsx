import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Journal, JournalX } from 'react-bootstrap-icons';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useGetPlanByInstanceIdQuery, useDeletePlanMutation } from '../../services/PlanService';
import { updateSelectedPlan } from '../../stores/UISlice';
import { useDispatch } from 'react-redux';
import {
  useNewInstantiatedPlanMutation,
  useDeleteInstantiatedPlanMutation,
} from '../../services/InstantiatedPlanService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { BaseInstantiatedPlan, PlanAttributes, PlanStatus } from '@devouringscripture/common';

interface JLButton {
  plan: PlanAttributes;
  percentageComplete?: number;
  deleteIP(id: string): void;
  createIP(id: string): void;
}
const JoinLeaveButton = ({ plan, percentageComplete, deleteIP, createIP }: JLButton): JSX.Element => {
  if (plan.status !== PlanStatus.Published) {
    return <i>Plan not ready for subscription</i>;
  }

  if (percentageComplete === undefined) {
    return (
      <Button variant="primary" onClick={() => createIP(plan.planInstanceId)}>
        Start
      </Button>
    );
  }

  return (
    <Button variant="primary" onClick={() => deleteIP(plan.planInstanceId)}>
      Leave
    </Button>
  );
};

interface PlanSummaryViewAttrs {
  planId: string;
  percentageComplete?: number;
}
export const PlanSummaryView = ({ planId, percentageComplete = undefined }: PlanSummaryViewAttrs) => {
  const { data, error, isLoading } = useGetPlanByInstanceIdQuery(planId);
  const [sendNewPlan] = useNewInstantiatedPlanMutation();
  const [sendRemovePlan] = useDeleteInstantiatedPlanMutation();
  const [deletePlan] = useDeletePlanMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createIP = useCallback(
    (planInstanceId: string) => {
      const newPlan: BaseInstantiatedPlan = {
        planInstanceId: planInstanceId,
        percentageComplete: 0,
      };

      sendNewPlan(newPlan);
    },
    [sendNewPlan]
  );

  const deleteIP = useCallback(
    (planInstanceId: string) => {
      sendRemovePlan(planInstanceId);
    },
    [sendRemovePlan]
  );

  const deletePlanOnServer = useCallback(
    (planInstanceId: string) => {
      deletePlan(planInstanceId);
    },
    [deletePlan]
  );

  const editPlan = useCallback(
    (planInstanceId: string) => {
      dispatch(updateSelectedPlan(planInstanceId));
      navigate('/plans/edit');
    },
    [dispatch, navigate]
  );

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
            <Button variant="primary" onClick={() => editPlan(planId)}>
              Edit
            </Button>
          ) : (
            ''
          )}
        </Col>
        <Col className="join-col">
          <JoinLeaveButton
            plan={data!}
            percentageComplete={percentageComplete}
            deleteIP={deleteIP}
            createIP={createIP}
          />
        </Col>
        <Col className="deleteCol">
          {data!.isAdmin ? (
            ''
          ) : (
            <Button variant="danger" onClick={() => deletePlanOnServer(planId)}>
              Delete
            </Button>
          )}
        </Col>
      </Row>
    </Alert>
  );
};
