import React, { useMemo, useState, useCallback } from 'react';
import { ListGroup } from 'react-bootstrap';
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

interface IReadingPlanItem {
  plan: InstantiatedPlan;
  dateToShow: string;
  version: string;
}

/**
 * Called by `CurrentReadingPlan` widget to render a given plan, with
 * the completed or incomplete indicator. In this case, callbacks aren't
 * used for completing/un-completing an item, this component makes its
 * own calls to the API to do so.
 *
 * When an item is clicked a `ShowPassageModal` is shown, allowing the
 * user to mark it complete/incomplete, to **Save** it (to the **Read**
 * page), and to mark **Actions** complete/incomplete.
 *
 * @param plan The reading plan to show
 * @param dateToShow The date being displayed
 * @param version The Bible version being used (e.g. ESV, NIV, ...)
 */
export const ReadingPlanItem = ({ plan, dateToShow, version }: IReadingPlanItem) => {
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

    const indexOfToday = getDayNum(plan, DateTime.now().toISODate());

    let prevIncomplete: DateTime | undefined = undefined;
    for (let i = indexOfToday - 1; i >= 0; i--) {
      if (!plan.days[i].completed) {
        prevIncomplete = DateTime.fromISO(plan.days[i].scheduledDate);
      }
    }
    if (prevIncomplete) {
      const diff = DateTime.fromISO(dateToShow).diff(prevIncomplete);
      if (diff.days > 5) {
        return 'danger';
      } else {
        return 'warning';
      }
    }

    if (plan.days![dayIndex].completed) {
      return 'success';
    } else {
      return 'secondary';
    }
  }, [plan, dateToShow, dayIndex]);

  if (isLoading || dayIndex < 0 || passage.osis === '') {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  return (
    <>
      <ListGroup.Item variant={variant} action>
        <div onClick={popupModal}>
          {icon} {data!.name}: <b className="reading-text">{getFormattedReference(passage.osis)}</b>
        </div>
        <ShowPassageModal
          passage={passage}
          show={modalShowing}
          closeFunction={closeModal}
          saveFunction={saveFunction}
          completeFunction={handleComplete}
          isComplete={plan.days![dayIndex].completed}
          dateForReading={dateToShow}
        />
      </ListGroup.Item>
    </>
  );
};
