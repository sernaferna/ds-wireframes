import React, { useCallback } from 'react';
import { useGetUserByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import Form from 'react-bootstrap/Form';
import { UserAttributes } from '@devouringscripture/common';
import { LoadingMessage, ErrorLoadingDataMessage } from './loading';

export function Settings() {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  const handleShowSIChange = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.showSizeIndicator = !newUser.settings.showSizeIndicator;
    update(newUser);
  }, [data, update]);

  const handleShowTTChange = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.showToastTester = !newUser.settings.showToastTester;
    update(newUser);
  }, [data, update]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const handleAdminChange = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.isAdmin = !newUser.isAdmin;
    update(newUser);
  };

  return (
    <Form>
      <Form.Check
        type="checkbox"
        id="showSizeIndicatorSetting"
        label="Show Size Indicator"
        checked={data!.settings.showSizeIndicator}
        onChange={handleShowSIChange}
      />
      <Form.Check
        type="checkbox"
        id="showToastTesterSetting"
        label="Show Toast Tester"
        checked={data!.settings.showToastTester}
        onChange={handleShowTTChange}
      />
      <Form.Check
        type="checkbox"
        id="isAdmin"
        label="Admin User?"
        checked={data!.isAdmin}
        onChange={handleAdminChange}
      />
    </Form>
  );
}
