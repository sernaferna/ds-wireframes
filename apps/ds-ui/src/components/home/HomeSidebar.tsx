import React from 'react';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { HomeSettings } from './HomeSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { ToastTester } from '../common/toasts/ToastTester';
import { useUserSettings } from '../../helpers/UserSettings';

export function HomeSidebar() {
  const [userData, userResponseError, userLoading, , updateBoolCallback] = useUserSettings();

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  return (
    <>
      <ToastTester />

      <SidebarCollapseWidget
        title="Configuration"
        visible={userData!.settings.home.showSettings}
        clickFunction={updateBoolCallback('settings.home.showSettings')}
      >
        <HomeSettings />
      </SidebarCollapseWidget>
    </>
  );
}
