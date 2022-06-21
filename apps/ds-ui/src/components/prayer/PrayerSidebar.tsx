import React from 'react';
import { useUserSettings } from '../../hooks/UserSettings';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { PrayerSettings } from './PrayerSettings';

export function PrayerSidebar() {
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
        visible={userData!.settings.prayer.showSettings}
        clickFunction={flipBoolCallback('settings.prayer.showSettings')}
      >
        <PrayerSettings />
      </SidebarCollapseWidget>
    </>
  );
}
