import React from 'react';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { DoPageSettings } from './DoPageSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { useUserSettings } from '../../hooks/UserSettings';

/**
 * Sidebar for the **Do** section. Only includes Settings.
 */
export const DoSidebar = () => {
  const [userData, userResponseError, userLoading, , flipBoolCallback] = useUserSettings();

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
        visible={userData!.settings.actions.showSettings}
        clickFunction={flipBoolCallback('settings.actions.showSettings')}
      >
        <DoPageSettings />
      </SidebarCollapseWidget>
    </>
  );
};
