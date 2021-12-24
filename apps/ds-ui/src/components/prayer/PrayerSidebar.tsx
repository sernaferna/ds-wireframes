import React from 'react';
import { useGetUserByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { PrayerSettings } from './PrayerSettings';
import { UserAttributes } from '@devouringscripture/common/src/dm/User';

export function PrayerSidebar() {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const showSettings = data!.settings.prayer.showSettings;

  const toggleSettings = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.prayer.showSettings = !newUser.settings.prayer.showSettings;
    update(newUser);
  };

  return (
    <>
      <SidebarCollapseWidget title="Prayer Page Settings" visible={showSettings} clickFunction={toggleSettings}>
        <PrayerSettings />
      </SidebarCollapseWidget>
    </>
  );
}
