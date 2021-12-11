import React from 'react';
import Form from 'react-bootstrap/Form';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { UserAttributes } from '../../datamodel/User';

export function HomeSettings() {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const dataFilter = data!.settings.home.statsFilter;

  const changeDataFilterOption = (option: string) => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data!));
    newUser.settings.home.statsFilter = option;
    update(newUser);
  };

  return (
    <Form>
      <Form.Check
        type="radio"
        label="Last Week"
        name="dataFilter"
        checked={dataFilter === 'week'}
        onChange={() => {
          changeDataFilterOption('week');
        }}
      />
      <Form.Check
        type="radio"
        label="Last Two Weeks"
        name="dataFilter"
        checked={dataFilter === '2weeks'}
        onChange={() => {
          changeDataFilterOption('week');
        }}
      />
      <Form.Check
        type="radio"
        label="Last Month"
        name="dataFilter"
        checked={dataFilter === 'month'}
        onChange={() => {
          changeDataFilterOption('month');
        }}
      />
      <Form.Check
        type="radio"
        label="Last Year"
        name="dataFilter"
        checked={dataFilter === 'year'}
        onChange={() => {
          changeDataFilterOption('year');
        }}
      />
      <Form.Check
        type="radio"
        label="All Time"
        name="dataFilter"
        checked={dataFilter === 'alltime'}
        onChange={() => {
          changeDataFilterOption('alltime');
        }}
      />
    </Form>
  );
}
