import React, { useMemo, useState, useCallback } from 'react';
import { BasePassage, InstantiatedPlan, getFormattedReference } from '@devouringscripture/common';
import { useGetPlanByInstanceIdQuery } from '../../services/PlanService';
import { useNewItemMutation } from '../../services/PassagesService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { ShowPassageModal } from './ShowPassageModal';
import Button from 'react-bootstrap/Button';
import { Check2Circle, Circle } from 'react-bootstrap-icons';

/**
 * Helper function to get the index of the day for the currently displayed date
 *
 * @param plan The overall plan data
 * @param dateToShow The date being shown
 * @returns Index of day in the days array, or -1 if not found
 */
const getDayNum = (plan: InstantiatedPlan, dateToShow: string): number => {
  if (!plan.days) {
    return -1;
  }

  for (let i = 0; i < plan.days!.length; i++) {
    if (plan.days[i].scheduledDate === dateToShow) {
      return i;
    }
  }

  return -1;
};

interface RPI {
  plan: InstantiatedPlan;
  dateToShow: string;
  version: string;
}
export const ReadingPlanItem = ({ plan, dateToShow, version }: RPI) => {
  const { data, error, isLoading } = useGetPlanByInstanceIdQuery(plan.planInstanceId);
  const [showModal, setShowModal] = useState(false);
  const [newItem] = useNewItemMutation();

  const dayIndex = getDayNum(plan, dateToShow);
  const passage: BasePassage = useMemo(() => {
    if (!data || !data!.days) {
      return { osis: '', version: version };
    }

    const currentOsis = data!.days![dayIndex].osis;

    return {
      osis: currentOsis,
      version: version,
    };
  }, [data, dayIndex, version]);

  const closeModalFunction = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const saveFunction = useCallback(() => {
    const { osis, version } = passage;

    const newPassage: BasePassage = { osis, version };
    newItem(newPassage);
    closeModalFunction();
  }, [passage, newItem, closeModalFunction]);

  const display = useCallback(() => {
    return () => {
      setShowModal(true);
    };
  }, [setShowModal]);

  const icon = useMemo(() => {
    if (!plan.days) {
      return <Circle />;
    }

    return plan.days![dayIndex].completed ? <Check2Circle /> : <Circle />;
  }, [plan, dayIndex]);

  if (isLoading || dayIndex < 0 || passage.osis === '') {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  return (
    <div>
      {data!.name}:
      <Button variant="link" onClick={display()}>
        {icon} Show {getFormattedReference(passage.osis)} ({passage.version})
      </Button>
      <ShowPassageModal
        passage={passage}
        show={showModal}
        closeFunction={closeModalFunction}
        saveFunction={saveFunction}
      />
    </div>
  );
};
