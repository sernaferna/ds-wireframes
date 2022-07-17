import React from 'react';
import { Button } from 'react-bootstrap';
import { PlanAttributes, PlanStatus } from '@devouringscripture/common';

interface IJoinLeaveButton {
  plan: PlanAttributes;
  percentageComplete?: number;
  deleteIP(id: string): void;
  createIP(id: string): void;
}

/**
 * Component which returns a button; logic determines if that button
 * allows the user to Start a plan or leave it.
 *
 * @param plan The `PlanAttributes` object with details for the plan in question
 * @param percentageComplete Percentage of the plan that's been completed (optional)
 * @param deleteIP Callback function to leave the plan (i.e. delete the **Instantiated Plan**)
 * @param createIP Callback function to join the plan (i.e. create an **Instantiated Plan**)
 */
export const JoinLeaveButton = ({ plan, percentageComplete, deleteIP, createIP }: IJoinLeaveButton): JSX.Element => {
  if (plan.status !== PlanStatus.Published) {
    return <i>Cannot subscribe to plan</i>;
  }

  if (percentageComplete === undefined) {
    const handleClick = (id: string) => {
      return () => {
        createIP(id);
      };
    };
    return (
      <Button variant="primary" onClick={handleClick(plan.planInstanceId)}>
        Start
      </Button>
    );
  }

  const handleClick = (id: string) => {
    return () => {
      deleteIP(id);
    };
  };
  return (
    <Button variant="primary" onClick={handleClick(plan.planInstanceId)}>
      Leave
    </Button>
  );
};
