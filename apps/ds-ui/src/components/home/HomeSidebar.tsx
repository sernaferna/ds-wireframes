import React from 'react';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { HomeSettings } from './HomeSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { ToastTester } from '../common/toasts/ToastTester';
import { useUserSettings } from '../../hooks/UserSettings';

/**
 * Sidebar for the **Home** section of the application. Includes only
 * the `ToastTester` component (which takes care of showing/hiding
 * itself), and the Settings.
 */
export const HomeSidebar = () => {
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
};
