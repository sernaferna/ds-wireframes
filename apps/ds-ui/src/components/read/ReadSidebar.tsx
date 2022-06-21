import React from 'react';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { ReadPageSettings } from './ReadPageSettings';
import { useUserSettings } from '../../hooks/UserSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { CurrentReadingPlan } from '../plans/read/CurrentReadingPlan';

export const ReadSidebar = () => {
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
        visible={userData!.settings.read.showSettings}
        clickFunction={flipBoolCallback('settings.read.showSettings')}
      >
        <ReadPageSettings />
      </SidebarCollapseWidget>

      <SidebarCollapseWidget
        title="Reading Plan"
        visible={userData!.settings.read.showReadingPlan}
        clickFunction={flipBoolCallback('settings.read.showReadingPlan')}
      >
        <CurrentReadingPlan />
      </SidebarCollapseWidget>
    </>
  );
};
