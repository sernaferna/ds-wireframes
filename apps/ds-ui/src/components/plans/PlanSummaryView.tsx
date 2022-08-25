import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, ProgressBar, Popover, OverlayTrigger, Button, Badge, Card } from 'react-bootstrap';
import { Journal, JournalX, FlagFill } from 'react-bootstrap-icons';
import { useGetPlanByInstanceIdQuery, useDeletePlanMutation } from '../../services/PlanService';
import { updateSelectedPlan } from '../../stores/UISlice';
import { useDispatch } from 'react-redux';
import {
  useNewInstantiatedPlanMutation,
  useDeleteInstantiatedPlanMutation,
} from '../../services/InstantiatedPlanService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { BaseInstantiatedPlan, PlanStatus } from '@devouringscripture/common';
import { JoinLeaveButton } from './JoinLeaveButton';

interface IPlanSummaryView {
  planId: string;
  percentageComplete?: number;
}

/**
 * Displays a summary view of a given reading plan. Loads the plan data
 * from the API, given the ID (passed as a param).
 *
 * @param planId ID of the plan to be displayed
 * @param percentageComplete What percentage of the plan the user has completed (if any)
 */
export const PlanSummaryView = ({ planId, percentageComplete = undefined }: IPlanSummaryView) => {
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
    return <ErrorLoadingDataMessage errors={[error]} />;
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
    <Card bg="light" text="dark" className="shadow my-3">
      <Card.Header>
        <Card.Title>
          {data!.isAdmin && <FlagFill />} {data!.name}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs="1">{apocIcon}</Col>
          <Col xs="11">
            <p>{data!.description}</p>
          </Col>
        </Row>

        <Row>
          <Col xs="2">
            <Badge className="primary">v{data!.version}</Badge>
          </Col>
          <Col xs="2">
            <Badge className="primary">{data!.length} weeks</Badge>
          </Col>
          <Col xs="8">
            {percentageComplete !== undefined ? (
              <ProgressBar
                variant="primary"
                now={percentageComplete * 100}
                label={`${Math.round(percentageComplete * 100)}%`}
              />
            ) : (
              <i>Not subscribed</i>
            )}
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row className="mt-3">
          <Col xs="4">
            <Button variant="outline-secondary" onClick={() => editPlan(planId)}>
              Edit
            </Button>
          </Col>
          <Col xs="4">
            <JoinLeaveButton
              plan={data!}
              percentageComplete={percentageComplete}
              deleteIP={deleteIP}
              createIP={createIP}
            />
          </Col>
          <Col xs="4">
            {data!.status !== PlanStatus.Deleted && (
              <Button variant="outline-warning" onClick={() => deletePlanOnServer(planId)}>
                Delete
              </Button>
            )}
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
