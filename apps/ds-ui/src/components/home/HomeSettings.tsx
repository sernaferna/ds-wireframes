import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { UserAttributes } from '@devouringscripture/common';

export const HomeSettings = () => {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  const changeDataFilterOption = useCallback(
    (option: string) => {
      return () => {
        const newUser: UserAttributes = JSON.parse(JSON.stringify(data!));
        newUser.settings.home.statsFilter = option;
        update(newUser);
      };
    },
    [data, update]
  );

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const dataFilter = data!.settings.home.statsFilter;

  return (
    <Form>
      <Form.Label>Choose Filter Option:</Form.Label>
      <Form.Check
        type="radio"
        label="Last Week"
        name="dataFilter"
        checked={dataFilter === 'week'}
        onChange={changeDataFilterOption('week')}
      />
      <Form.Check
        type="radio"
        label="Last Two Weeks"
        name="dataFilter"
        checked={dataFilter === '2weeks'}
        onChange={changeDataFilterOption('2weeks')}
      />
      <Form.Check
        type="radio"
        label="Last Month"
        name="dataFilter"
        checked={dataFilter === 'month'}
        onChange={changeDataFilterOption('month')}
      />
      <Form.Check
        type="radio"
        label="Last Year"
        name="dataFilter"
        checked={dataFilter === 'year'}
        onChange={changeDataFilterOption('year')}
      />
      <Form.Check
        type="radio"
        label="All Time"
        name="dataFilter"
        checked={dataFilter === 'alltime'}
        onChange={changeDataFilterOption('alltime')}
      />
    </Form>
  );
};
