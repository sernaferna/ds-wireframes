import React from 'react';
import { Form } from 'react-bootstrap';
import { useUserSettings } from '../../hooks/UserSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';

export function DoPageSettings() {
  const [userData, userResponseError, userLoading, , flipBoolCallback] = useUserSettings();

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  return (
    <Form>
      <h6>General Settings</h6>
      <Form.Check
        type="checkbox"
        id="showSizeIndicatorSetting"
        label="Show Size Indicator"
        checked={userData!.settings.showSizeIndicator}
        onChange={flipBoolCallback('settings.showSizeIndicator')}
      />
    </Form>
  );
}
