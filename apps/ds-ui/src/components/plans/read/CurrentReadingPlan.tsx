import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { useGetSubscribedPlansQuery } from '../../../services/InstantiatedPlanService';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../../services/UserService';
import { getDateForReadingPlan, updateDateShowingInReadingPlan } from '../../../stores/UISlice';
import { ReadingPlanItem } from './ReadingPlanItem';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { DateTime } from 'luxon';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';

export const CurrentReadingPlan = () => {
  const dateToShow = DateTime.fromISO(useSelector(getDateForReadingPlan));
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetSubscribedPlansQuery();
  const userData = useGetUserByIdQuery(HARDCODED_USER_ID);

  const version = useMemo(() => {
    if (!userData.data) {
      return '';
    }

    return userData.data.settings.read.defaultVersion;
  }, [userData]);

  const earliestDate = useMemo(() => {
    if (!data) {
      return DateTime.now();
    }

    const dateList: DateTime[] = data
      .filter((item) => item.days)
      .map((item) => DateTime.fromISO(item.days![0].scheduledDate));
    return DateTime.min(...dateList);
  }, [data]);

  const latestDate = useMemo(() => {
    if (!data) {
      return DateTime.now();
    }

    const dateList: DateTime[] = data
      .filter((item) => item.days)
      .map((item) => DateTime.fromISO(item.days![item.days!.length - 1].scheduledDate));
    return DateTime.max(...dateList);
  }, [data]);

  const plansToShow: JSX.Element[] = useMemo(() => {
    if (!data) {
      return [];
    }

    return data!
      .filter((item) => {
        for (let i = 0; i < item.days!.length; i++) {
          if (item.days![i].scheduledDate === dateToShow.toISODate()) {
            return true;
          }
        }

        return false;
      })
      .map((item, index) => (
        <ReadingPlanItem key={`rpi-${index}`} plan={item} dateToShow={dateToShow.toISODate()} version={version} />
      ));
  }, [data, version, dateToShow]);

  const handleDateScroll = useCallback(
    (increase: boolean) => {
      let newDate;

      if (increase) {
        newDate = dateToShow.plus({ day: 1 });
      } else {
        newDate = dateToShow.minus({ day: 1 });
      }

      dispatch(updateDateShowingInReadingPlan(newDate.toISODate()));
    },
    [dateToShow, dispatch]
  );

  const handleLeftClick = () => {
    return () => {
      if (dateToShow <= earliestDate) {
        return;
      }

      handleDateScroll(false);
    };
  };

  const handleRightClick = () => {
    return () => {
      if (dateToShow >= latestDate) {
        return;
      }

      handleDateScroll(true);
    };
  };

  if (isLoading || userData.isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }
  if (userData.error) {
    return <ErrorLoadingDataMessage theError={userData.error} />;
  }

  return (
    <>
      <Card className="action-widget-card">
        <Card.Body>
          <h4>ReadingPlans</h4>
          <h6>
            <CaretLeftFill
              className={dateToShow <= earliestDate ? 'inactive-scroller' : 'active-scroller'}
              onClick={handleLeftClick()}
            />
            <span>{dateToShow.toISODate()}</span>
            <CaretRightFill
              className={dateToShow >= latestDate ? 'inactive-scroller' : 'active-scroller'}
              onClick={handleRightClick()}
            />
          </h6>
        </Card.Body>
      </Card>
      <ListGroup>{plansToShow}</ListGroup>
    </>
  );
};