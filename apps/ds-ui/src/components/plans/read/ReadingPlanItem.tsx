import React, { useMemo, useState, useCallback } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { BasePassage, InstantiatedPlan, getFormattedReference } from '@devouringscripture/common';
import { useGetPlanByInstanceIdQuery } from '../../../services/PlanService';
import { useCompletePlanItemMutation } from '../../../services/InstantiatedPlanService';
import { useNewItemMutation } from '../../../services/PassagesService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { ShowPassageModal } from './ShowPassageModal';
import { Check2Circle, Circle } from 'react-bootstrap-icons';
import { DateTime } from 'luxon';

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
  const [modalShowing, setModalShowing] = useState(false);
  const [newItem] = useNewItemMutation();
  const [completeItem] = useCompletePlanItemMutation();

  const dayIndex = useMemo(() => {
    return getDayNum(plan, dateToShow);
  }, [plan, dateToShow]);

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

  const saveFunction = useCallback(() => {
    newItem(passage);
    setModalShowing(false);
  }, [passage, newItem, setModalShowing]);

  const icon = useMemo(() => {
    if (!plan.days) {
      return <Circle />;
    }

    return plan.days![dayIndex].completed ? <Check2Circle /> : <Circle />;
  }, [plan, dayIndex]);

  const handleComplete = useCallback(
    (complete: boolean) => {
      completeItem({
        planId: plan.planInstanceId,
        dayIndex: dayIndex,
        day: {
          completed: complete,
          scheduledDate: plan.days![dayIndex].scheduledDate,
        },
      });
    },
    [completeItem, plan, dayIndex]
  );

  const closeModal = useCallback(() => {
    setModalShowing(false);
  }, [setModalShowing]);

  const popupModal = useCallback(() => {
    setModalShowing(true);
  }, [setModalShowing]);

  const variant = useMemo(() => {
    if (!plan.days) {
      return 'secondary';
    }

    if (plan.days![dayIndex].completed) {
      return 'success';
    } else {
      const showingDate = DateTime.fromISO(dateToShow);
      const planDate = DateTime.fromISO(plan.days![dayIndex].scheduledDate);
      if (planDate < showingDate) {
        return 'warning';
      }
    }
  }, [plan.days, dayIndex, dateToShow]);

  if (isLoading || dayIndex < 0 || passage.osis === '') {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  return (
    <ListGroup.Item variant={variant} action onClick={popupModal}>
      {icon} {data!.name}: {getFormattedReference(passage.osis)}
      <ShowPassageModal
        passage={passage}
        show={modalShowing}
        closeFunction={closeModal}
        saveFunction={saveFunction}
        completeFunction={handleComplete}
        isComplete={plan.days![dayIndex].completed}
      />
    </ListGroup.Item>
  );
};
