import React from 'react';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { WriteSettings } from './WriteSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { useUserSettings } from '../../hooks/UserSettings';

export const WriteSidebar = () => {
  const [userData, userResponseError, userLoading, , flipBoolCallback] = useUserSettings();

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  return (
    <SidebarCollapseWidget
      title="Configuration"
      visible={userData!.settings.write.showSettings}
      clickFunction={flipBoolCallback('settings.write.showSettings')}
    >
      <WriteSettings />
    </SidebarCollapseWidget>
  );
};
