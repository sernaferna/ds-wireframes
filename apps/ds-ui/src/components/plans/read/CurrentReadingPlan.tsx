import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Card } from 'react-bootstrap';
import { useGetSubscribedPlansQuery } from '../../../services/InstantiatedPlanService';
import { useUserSettings } from '../../../hooks/UserSettings';
import { getDateForReadingPlan, updateDateShowingInReadingPlan } from '../../../stores/UISlice';
import { ReadingPlanItem } from './ReadingPlanItem';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { DateTime } from 'luxon';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';

interface ICurrentReadingPlan {
  showTitle?: boolean;
}
export const CurrentReadingPlan = ({ showTitle = false }: ICurrentReadingPlan) => {
  const dateToShow = DateTime.fromISO(useSelector(getDateForReadingPlan));
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetSubscribedPlansQuery();
  const [userData, userResponseError, userLoading] = useUserSettings();

  const version = useMemo(() => {
    if (!userData) {
      return '';
    }

    return userData.settings.read.defaultVersion;
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
    <>
      <Card className="m-0 border-0">
        <Card.Body>
          {showTitle ? <h4>Reading Plan(s)</h4> : <></>}
          <h6>
            <span className={`p-0 m-0 ${dateToShow <= earliestDate ? 'text-muted' : 'btn fs-6'}`}>
              <CaretLeftFill className="align-middle" onClick={handleLeftClick()} />
            </span>
            <span className="user-select-none">{dateToShow.toISODate()}</span>
            <span className={`p-0 m-0 ${dateToShow >= latestDate ? 'text-muted' : 'btn fs-6'}`}>
              <CaretRightFill className="align-middle" onClick={handleRightClick()} />
            </span>
          </h6>
        </Card.Body>
      </Card>
      <ListGroup>{plansToShow}</ListGroup>
    </>
  );
};
