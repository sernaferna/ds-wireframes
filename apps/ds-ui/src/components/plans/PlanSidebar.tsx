import React from 'react';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { PlanSettings } from './PlanSettings';
import { useUserSettings } from '../../hooks/UserSettings';

/**
 * Sidebar page for the **Plans** section of the app
 */
export const PlanSidebar = () => {
  const [userData, userResponseError, userLoading, , flipUserBoolCallback] = useUserSettings();

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  return (
    <>
      <SidebarCollapseWidget
        title="Configuration"
        visible={userData!.settings.plans.showSettings}
        clickFunction={flipUserBoolCallback('settings.plans.showSettings')}
      >
        <PlanSettings />
      </SidebarCollapseWidget>
    </>
  );
};
