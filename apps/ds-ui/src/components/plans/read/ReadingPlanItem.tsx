import React, { useMemo, useCallback } from 'react';
import { Alert, Button, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { BasePassage, InstantiatedPlan, getFormattedReference, Verse, ActionsForDay } from '@devouringscripture/common';
import { useGetPlanByInstanceIdQuery } from '../../../services/PlanService';
import { useCompletePlanItemMutation } from '../../../services/InstantiatedPlanService';
import { useNewItemMutation } from '../../../services/PassagesService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { Check, Check2Circle, Circle, PinAngleFill, ThreeDots, X } from 'react-bootstrap-icons';
import { DateTime } from 'luxon';
import { ToastType, TOAST_FADE_TIME, getToastManager } from '../../common/toasts/ToastManager';
import { useGetVersesForOSISQuery } from '../../../services/VapiService';
import { useGetActionByDateQuery, useMarkItemReadForDayMutation } from '../../../services/ActionsService';

const OTSHORTID = 'actions|default|shortotpass';
const OTLONGID = 'actions|default|rlotpass';
const NTSHORTID = 'actions|default|rsntpass';
const NTLONGID = 'actions|default|rlntpass';

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

/**
 * Helper function to get the number of Old Testament and New Testament
 * verses covered in a range of verses.
 *
 * @param verses Array of `Verse` objects
 * @returns Counts of OT and NT verses included in the array
 */
const getPassageStats = (verses: Verse[]): [number, number] => {
  let otVerses = 0;
  let ntVerses = 0;

  for (let i = 0; i < verses.length; i++) {
    if (verses[i].newTestament) {
      ntVerses++;
    } else {
      otVerses++;
    }
  }

  return [otVerses, ntVerses];
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
  const [newItem] = useNewItemMutation();
  const [completeItem] = useCompletePlanItemMutation();
  const { data: actionData, error: actionError, isLoading: actionIsLoading } = useGetActionByDateQuery(dateToShow);
  const [markActionReadUnread] = useMarkItemReadForDayMutation();

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

  const {
    data: verseData,
    error: verseError,
    isLoading: versesAreLoading,
  } = useGetVersesForOSISQuery(passage.osis, { skip: passage.osis === '' });

  const [otVerses, ntVerses, otConditionMet, ntConditionMet] = useMemo(() => {
    const [otVerses, ntVerses] = getPassageStats(verseData || []);
    const otConditionMet: boolean = otVerses > 4;
    const ntConditionMet: boolean = ntVerses > 4;

    return [otVerses, ntVerses, otConditionMet, ntConditionMet];
  }, [verseData]);

  const saveFunction = useCallback(() => {
    newItem(passage);
    getToastManager().show({
      title: 'Reading List',
      content: 'Item Saved',
      type: ToastType.Success,
      duration: TOAST_FADE_TIME,
    });
  }, [passage, newItem]);

  const [variant, buttonVariant] = useMemo(() => {
    if (!plan.days) {
      return ['light', 'outline-dark'];
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
        return ['danger', 'outline-danger'];
      } else {
        return ['warning', 'outline-warning'];
      }
    }

    if (plan.days![dayIndex].completed) {
      return ['success', 'outline-success'];
    } else {
      return ['light', 'outline-dark'];
    }
  }, [plan, dateToShow, dayIndex]);

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

      if (complete) {
        const newActions: ActionsForDay = { ...actionData! };

        if (ntConditionMet) {
          markActionReadUnread({
            dataForDay: newActions,
            idForDay: newActions.id,
            idForItem: NTLONGID,
          });
        }
        if (otConditionMet) {
          markActionReadUnread({
            dataForDay: newActions,
            idForDay: newActions.id,
            idForItem: OTLONGID,
          });
        }
        if (ntVerses > 0 && !ntConditionMet) {
          markActionReadUnread({
            dataForDay: newActions,
            idForDay: newActions.id,
            idForItem: NTSHORTID,
          });
        }
        if (otVerses > 0 && !otConditionMet) {
          markActionReadUnread({
            dataForDay: newActions,
            idForDay: newActions.id,
            idForItem: OTSHORTID,
          });
        }
      }
    },
    [completeItem, plan, dayIndex, markActionReadUnread, actionData, ntConditionMet, otConditionMet, ntVerses, otVerses]
  );

  const completeButton = useMemo(() => {
    if (!plan.days || !actionData || actionIsLoading) {
      return (
        <Button variant={buttonVariant} disabled>
          <ThreeDots />
        </Button>
      );
    }

    return plan.days![dayIndex].completed ? (
      <Button onClick={() => handleComplete(false)} variant={buttonVariant}>
        <Check2Circle />
      </Button>
    ) : (
      <Button onClick={() => handleComplete(true)} variant={buttonVariant}>
        <Circle />
      </Button>
    );
  }, [plan, dayIndex, handleComplete, buttonVariant, actionData, actionIsLoading]);

  if (isLoading || dayIndex < 0 || passage.osis === '') {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }
  if (verseError) {
    return <ErrorLoadingDataMessage theError={verseError} />;
  }
  if (actionError) {
    return <ErrorLoadingDataMessage theError={actionError} />;
  }

  const statsContent = versesAreLoading ? (
    <div className="text-muted">Loading stats...</div>
  ) : (
    <div className="text-muted">
      <p>Will complete:</p>
      <ListGroup>
        <ListGroup.Item as="li" variant="light" className="d-flex justify-content-between align-items-start">
          <div>{otConditionMet ? <Check className="text-success" /> : <X className="text-danger" />} Old Testament</div>
          <Badge pill bg={otConditionMet ? 'success' : 'dark'}>
            {otVerses}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item as="li" variant="light" className="d-flex justify-content-between align-items-start">
          <div>{ntConditionMet ? <Check className="text-success" /> : <X className="text-danger" />} New Testament</div>
          <Badge pill bg={ntConditionMet ? 'success' : 'dark'}>
            {ntVerses}
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );

  return (
    <>
      <Alert variant={variant}>
        <Alert.Heading>{data!.name}</Alert.Heading>
        <Row>
          <Col>{getFormattedReference(passage.osis)}</Col>
        </Row>
        <Row>
          <Col>{completeButton}</Col>
          <Col>
            <Button variant={buttonVariant} onClick={saveFunction}>
              <PinAngleFill />
            </Button>
          </Col>
        </Row>
        {!plan.days![dayIndex].completed && (
          <Row>
            <Col>{statsContent}</Col>
          </Row>
        )}
      </Alert>
    </>
  );
};
