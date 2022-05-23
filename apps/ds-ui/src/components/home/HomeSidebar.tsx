import React, { useCallback } from 'react';
import { useGetUserByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import { UserAttributes } from '@devouringscripture/common';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { HomeSettings } from './HomeSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { ToastTester } from '../common/toasts/ToastTester';

export function HomeSidebar() {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  const toggleSettings = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.home.showSettings = !newUser.settings.home.showSettings;
    update(newUser);
  }, [data, update]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const showSettings = data!.settings.home.showSettings;

  return (
    <>
      <ToastTester />

      <SidebarCollapseWidget title="Configuration" visible={showSettings} clickFunction={toggleSettings}>
        <HomeSettings />
      </SidebarCollapseWidget>
    </>
  );
}
