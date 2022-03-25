import React from 'react';
import Button from 'react-bootstrap/Button';
import { PlanAttributes, PlanStatus } from '@devouringscripture/common';

interface JLButton {
  plan: PlanAttributes;
  percentageComplete?: number;
  deleteIP(id: string): void;
  createIP(id: string): void;
}
export const JoinLeaveButton = ({ plan, percentageComplete, deleteIP, createIP }: JLButton): JSX.Element => {
  if (plan.status !== PlanStatus.Published) {
    return <i>Cannot subscribe to plan</i>;
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
