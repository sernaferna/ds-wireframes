import React from 'react';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { useGetByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import { UserAttributes } from '../../datamodel/User';
import { DoPageSettings } from './DoPageSettings';

export function DoSidebar() {
  const { data, error, isLoading } = useGetByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <div>Waiting...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const showSettings = data ? data.settings.actions.showSettings : true;

  const toggleSettings = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.actions.showSettings = !newUser.settings.actions.showSettings;
    update(newUser);
  };

  return (
    <SidebarCollapseWidget title="settings" visible={showSettings} clickFunction={toggleSettings}>
      <DoPageSettings />
    </SidebarCollapseWidget>
  );
}
