import React from 'react';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { ReadPageSettings } from './ReadPageSettings';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { UserAttributes } from '../../datamodel/User';

export const ReadSidebar = () => {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const showSettings = data!.settings.read.showSettings;

  const toggleSettings = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.read.showSettings = !newUser.settings.read.showSettings;
    update(newUser);
  };

  return (
    <>
      <SidebarCollapseWidget title="Settings" visible={showSettings} clickFunction={toggleSettings}>
        <ReadPageSettings />
      </SidebarCollapseWidget>
    </>
  );
};
