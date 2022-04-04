import React, { useMemo } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useGetSubscribedPlansQuery } from '../../../services/InstantiatedPlanService';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../../services/UserService';
import { ReadingPlanItem } from './ReadingPlanItem';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { DateTime } from 'luxon';

export const CurrentReadingPlan = () => {
  const { data, error, isLoading } = useGetSubscribedPlansQuery();
  const userData = useGetUserByIdQuery(HARDCODED_USER_ID);

  const version = useMemo(() => {
    if (!userData.data) {
      return '';
    }

    return userData.data.settings.read.defaultVersion;
  }, [userData]);

  const plansToShow: JSX.Element[] = useMemo(() => {
    if (!data) {
      return [];
    }

    const dateToday = DateTime.now().toISODate();
    return data!.map((item, index) => (
      <ReadingPlanItem key={`rpi-${index}`} plan={item} dateToShow={dateToday} version={version} />
    ));
  }, [data, version]);

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
      <h3>Reading Plans</h3>
      <ListGroup>{plansToShow}</ListGroup>
    </>
  );
};
