import React from 'react';
import { Form } from 'react-bootstrap';
import { useUserSettings } from '../../hooks/UserSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';

/**
 * Settings component for the **Write** section of the app
 */
export const WriteSettings = () => {
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

      <h6 className="mt-3">Markdown Settings</h6>
      <Form.Text>The following settings apply to how markdown text is formatted.</Form.Text>
      <Form.Check
        type="checkbox"
        id="autoSmallCapsSetting"
        label="Automatically use Small Caps"
        checked={userData!.settings.write.autoSmallCaps}
        onChange={flipBoolCallback('settings.write.autoSmallCaps')}
      />
      <Form.Check
        type="checkbox"
        id="autoADBCSetting"
        label="Automatically Convert A.D./B.C. to Small Caps"
        checked={userData!.settings.write.autoADBC}
        onChange={flipBoolCallback('settings.write.autoADBC')}
      />
    </Form>
  );
};
