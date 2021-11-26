import React from 'react';
import { useGetByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import { UserAttributes } from '../../datamodel/User';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { HomeSettings } from './HomeSettings';
import { ActionsWidget } from '../do/ActionsWidget';
import { PrayerSnapshot } from '../prayer/PrayerSnapshot';

export function HomeSidebar() {
  const { data, error, isLoading } = useGetByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <div>Waiting...</div>;
  }
  if (error) {
    return <div>An error occurred: {error}</div>;
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
      <SidebarCollapseWidget title="Configuration" visible={showSettings} clickFunction={toggleSettings}>
        <HomeSettings />
      </SidebarCollapseWidget>

      <SidebarCollapseWidget title="Actions" visible={showActions} clickFunction={toggleActions}>
        <ActionsWidget />
      </SidebarCollapseWidget>

      <SidebarCollapseWidget title="Prayer Items" visible={showPrayers} clickFunction={togglePrayers}>
        <PrayerSnapshot />
      </SidebarCollapseWidget>
    </>
  );
}
