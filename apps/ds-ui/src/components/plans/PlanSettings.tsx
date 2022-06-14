import React, { useState, useCallback } from 'react';
import { Button, Form } from 'react-bootstrap';
import { LegendModal } from './LegendModal';
import { useUserSettings } from '../../helpers/UserSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';

export const PlanSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, userResponseError, userLoading, , flipBoolCallback] = useUserSettings();

  const closeModalFunction = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

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

      <h6 className="mt-3">Plan Settings</h6>
      <Button onClick={() => setShowModal(true)}>Show Legend</Button>

      <LegendModal closeFunction={closeModalFunction} show={showModal} />
    </Form>
  );
};
