import React from 'react';
import { useUserSettings } from '../../hooks/UserSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { StatsSettings } from './StatsSettings';

export const StatsSidebar = () => {
  const [userData, userResponseError, userLoading, , toggleBoolCallback] = useUserSettings();

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
        visible={userData!.settings.stats.showSettings}
        clickFunction={toggleBoolCallback('settings.stats.showSettings')}
      >
        <StatsSettings />
      </SidebarCollapseWidget>
    </>
  );
};
