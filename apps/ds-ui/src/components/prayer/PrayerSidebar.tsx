import React, { useCallback } from 'react';
import { useGetUserByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { PrayerSettings } from './PrayerSettings';
import { UserAttributes } from '@devouringscripture/common';

export function PrayerSidebar() {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  const toggleSettings = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.prayer.showSettings = !newUser.settings.prayer.showSettings;
    update(newUser);
  }, [data, update]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const showSettings = data!.settings.prayer.showSettings;

  return (
    <>
      <SidebarCollapseWidget title="Configuration" visible={showSettings} clickFunction={toggleSettings}>
        <PrayerSettings />
      </SidebarCollapseWidget>
    </>
  );
}
