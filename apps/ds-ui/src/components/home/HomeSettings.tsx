import React from 'react';
import { Form } from 'react-bootstrap';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { useUserSettings } from '../../hooks/UserSettings';

/**
 * Settings for the **Home** section of the application.
 */
export const HomeSettings = () => {
  const [userData, userResponseError, userIsLoading, , flipUserBoolCallback] = useUserSettings();

  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }
  if (userIsLoading || userData === undefined) {
    return <LoadingMessage />;
  }

  return (
    <Form>
      <h6>General Settings</h6>
      <Form.Check
        type="checkbox"
        id="showSizeIndicatorSetting"
        label="Show Size Indicator"
        checked={userData!.settings.showSizeIndicator}
        onChange={flipUserBoolCallback('settings.showSizeIndicator')}
      />
      <Form.Check
        type="checkbox"
        id="showToastTesterSetting"
        label="Show Toast Tester"
        checked={userData!.settings.showToastTester}
        onChange={flipUserBoolCallback('settings.showToastTester')}
      />
      <Form.Check
        type="checkbox"
        id="isAdmin"
        label="Admin User?"
        checked={userData!.isAdmin}
        onChange={flipUserBoolCallback('isAdmin')}
      />
    </Form>
  );
};
