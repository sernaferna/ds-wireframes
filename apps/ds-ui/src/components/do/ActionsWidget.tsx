import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDateForActions, updateDateShowingInActions } from '../../stores/UISlice';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import { Card } from 'react-bootstrap';
import { useGetActionByDateQuery } from '../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { ActionsForDay } from '@devouringscripture/common';
import { ActionWidgetForm } from './ActionWidgetForm';
import { DateTime } from 'luxon';
import { useUserSettings } from '../../hooks/UserSettings';

interface IActionsWidget {
  showTitle?: boolean;
}
export function ActionsWidget({ showTitle = false }: IActionsWidget) {
  const dateToShow = DateTime.fromISO(useSelector(getDateForActions));
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetActionByDateQuery(dateToShow.toISODate());

  const [userData, userResponseError, userLoading] = useUserSettings();

  const handleDateScroll = useCallback(
    (increase: boolean) => {
      let newDate;

      if (increase) {
        newDate = dateToShow.plus({ day: 1 });
      } else {
        newDate = dateToShow.minus({ day: 1 });
      }

      dispatch(updateDateShowingInActions(newDate.toISODate()));
    },
    [dispatch, dateToShow]
  );

  const showPrevButton: boolean = useMemo(() => {
    if (!userData || !dateToShow) {
      return false;
    }

    const signupDate = DateTime.fromISO(userData!.signupDate);
    const diff = dateToShow.diff(signupDate, 'days').days;
    if (diff > 0) {
      return true;
    } else {
      return false;
    }
  }, [userData, dateToShow]);

  const showNextButton: boolean = useMemo(() => {
    if (!dateToShow) {
      return false;
    }

    const diff = dateToShow.diff(DateTime.now(), 'days').days;
    if (diff < -1) {
      return true;
    } else {
      return false;
    }
  }, [dateToShow]);

  const handleLeftClick = useCallback(() => {
    return () => {
      if (!showPrevButton) {
        return;
      }

      handleDateScroll(false);
    };
  }, [showPrevButton, handleDateScroll]);

  const handleRightClick = useCallback(() => {
    return () => {
      if (!showNextButton) {
        return;
      }

      handleDateScroll(true);
    };
  }, [showNextButton, handleDateScroll]);

  if (isLoading || userLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  return (
    <Card className="m-0 border-0">
      <Card.Body>
        {showTitle ? <h4>Action List</h4> : <></>}
        <h6>
          <span className={`p-0 m-0 ${showPrevButton ? 'text-dark btn btn-lg fs-4' : 'text-muted'}`}>
            <CaretLeftFill className="align-middle" onClick={handleLeftClick()} />
          </span>
          <span className="user-select-none mx-1">{dateToShow.toISODate()}</span>
          <span className={`p-0 m-0 ${showNextButton ? 'text-dark btn btn-lg fs-4' : 'text-muted'}`}>
            <CaretRightFill className="align-middle" onClick={handleRightClick()} />
          </span>
        </h6>
        <ActionWidgetForm day={data as ActionsForDay} />
      </Card.Body>
    </Card>
  );
}
