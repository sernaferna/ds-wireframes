import React from 'react';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { useGetUserByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import { UserAttributes } from '@devouringscripture/common';
import { DoPageSettings } from './DoPageSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { CreatePrayerItem } from '../prayer/CreatePrayerItem';

export function DoSidebar() {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const showSettings = data ? data.settings.actions.showSettings : true;
  const showPrayer = data ? data.settings.actions.showPrayerEntry : true;

  const toggleSettings = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.actions.showSettings = !newUser.settings.actions.showSettings;
    update(newUser);
  };

  const togglePrayer = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.actions.showPrayerEntry = !newUser.settings.actions.showPrayerEntry;
    update(newUser);
  };

  return (
    <>
      <SidebarCollapseWidget title="settings" visible={showSettings} clickFunction={toggleSettings}>
        <DoPageSettings />
      </SidebarCollapseWidget>

      <SidebarCollapseWidget title="Prayer" visible={showPrayer} clickFunction={togglePrayer}>
        <CreatePrayerItem />
      </SidebarCollapseWidget>
    </>
  );
}
