import React from 'react';
import { useGetUserByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import { UserAttributes } from '../../datamodel/User';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { HomeSettings } from './HomeSettings';
import { ActionsWidget } from '../do/ActionsWidget';
import { PrayerSnapshot } from '../prayer/PrayerSnapshot';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';

export function HomeSidebar() {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const showSettings = data!.settings.home.showSettings;
  const showActions = data!.settings.home.showActions;
  const showPrayers = data!.settings.home.showPrayers;

  const toggleSettings = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.home.showSettings = !newUser.settings.home.showSettings;
    update(newUser);
  };

  const toggleActions = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.home.showActions = !newUser.settings.home.showActions;
    update(newUser);
  };

  const togglePrayers = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.home.showPrayers = !newUser.settings.home.showPrayers;
    update(newUser);
  };

  return (
    <>
      <SidebarCollapseWidget title="Actions" visible={showActions} clickFunction={toggleActions}>
        <ActionsWidget />
      </SidebarCollapseWidget>

      <SidebarCollapseWidget title="Prayer Items" visible={showPrayers} clickFunction={togglePrayers}>
        <PrayerSnapshot />
      </SidebarCollapseWidget>

      <SidebarCollapseWidget title="Configuration" visible={showSettings} clickFunction={toggleSettings}>
        <HomeSettings />
      </SidebarCollapseWidget>
    </>
  );
}
