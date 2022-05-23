import React, { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../../services/UserService';
import { UserAttributes } from '@devouringscripture/common';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';

export const HomeSettings = () => {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [updateUser] = useUpdateUserMutation();

  const handleShowSIChange = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.showSizeIndicator = !newUser.settings.showSizeIndicator;
    updateUser(newUser);
  }, [data, updateUser]);

  const handleTTChange = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.showToastTester = !newUser.settings.showToastTester;
    updateUser(newUser);
  }, [data, updateUser]);

  const handleAdminChange = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.isAdmin = !newUser.isAdmin;
    updateUser(newUser);
  }, [data, updateUser]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

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
        onChange={handleTTChange}
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
};
