import React from 'react';
import { useGetByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { UserAttributes } from '../../datamodel/User';
import { LoadingMessage, ErrorLoadingDataMessage } from './loading';

export function Settings() {
  const { data, error, isLoading } = useGetByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const handleShowSIChange = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.showSizeIndicator = !newUser.settings.showSizeIndicator;
    update(newUser);
  };

  return (
    <Form>
      <Form.Check type="checkbox" id="showSizeIndicatorSetting" label="Show Size Indicator" checked={data!.settings.showSizeIndicator} onChange={handleShowSIChange} />
    </Form>
  );
}
