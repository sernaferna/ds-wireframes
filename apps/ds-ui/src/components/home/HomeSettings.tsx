import React, { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { useUserSettings } from '../../helpers/UserSettings';

export const HomeSettings = () => {
  const [userData, userResponseError, userIsLoading, flipUserBool] = useUserSettings();

  // const handleSettingChange = useCallback((setting:string)=> {
  //   return () => {
  //     flipUserBool(setting);
  //   }
  // }, [flipUserBool]);

  const handleShowSIChange = useCallback(() => {
    flipUserBool('settings.showSizeIndicator');
  }, [flipUserBool]);

  const handleTTChange = useCallback(() => {
    flipUserBool('settings.showToastTester');
  }, [flipUserBool]);

  const handleAdminChange = useCallback(() => {
    flipUserBool('isAdmin');
  }, [flipUserBool]);

  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }
  if (userIsLoading || userData === undefined) {
    return <LoadingMessage />;
  }

  return (
    <Form>
      <Form.Check
        type="checkbox"
        id="showSizeIndicatorSetting"
        label="Show Size Indicator"
        checked={userData!.settings.showSizeIndicator}
        onChange={handleShowSIChange}
      />
      <Form.Check
        type="checkbox"
        id="showToastTesterSetting"
        label="Show Toast Tester"
        checked={userData!.settings.showToastTester}
        onChange={handleTTChange}
      />
      <Form.Check
        type="checkbox"
        id="isAdmin"
        label="Admin User?"
        checked={userData!.isAdmin}
        onChange={handleAdminChange}
      />
    </Form>
  );
};
