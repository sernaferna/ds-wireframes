import React from 'react';
import { Form } from 'react-bootstrap';
import { useUserSettings } from '../../hooks/UserSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';

/**
 * Settings component for **Stats** section of the app
 */
export const StatsSettings = () => {
  const [userData, userResponseError, userLoading, , , , updateStringCallback] = useUserSettings();

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  const dataFilter = userData!.settings.stats.statsFilter;

  return (
    <>
      <Form.Label>Choose Filter Option:</Form.Label>
      <Form.Check
        type="radio"
        label="Last Week"
        name="dataFilter"
        checked={dataFilter === 'week'}
        onChange={updateStringCallback('settings.stats.statsFilter', 'week')}
      />
      <Form.Check
        type="radio"
        label="Last Two Weeks"
        name="dataFilter"
        checked={dataFilter === '2weeks'}
        onChange={updateStringCallback('settings.stats.statsFilter', '2weeks')}
      />
      <Form.Check
        type="radio"
        label="Last Month"
        name="dataFilter"
        checked={dataFilter === 'month'}
        onChange={updateStringCallback('settings.stats.statsFilter', 'month')}
      />
      <Form.Check
        type="radio"
        label="Last Year"
        name="dataFilter"
        checked={dataFilter === 'year'}
        onChange={updateStringCallback('settings.stats.statsFilter', 'year')}
      />
      <Form.Check
        type="radio"
        label="All Time"
        name="dataFilter"
        checked={dataFilter === 'alltime'}
        onChange={updateStringCallback('settings.stats.statsFilter', 'alltime')}
      />
    </>
  );
};
