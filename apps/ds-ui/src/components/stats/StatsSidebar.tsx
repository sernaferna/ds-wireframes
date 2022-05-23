import React, { useCallback } from 'react';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../../services/UserService';
import { UserAttributes } from '@devouringscripture/common';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { StatsSettings } from './StatsSettings';

export const StatsSidebar = () => {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  const toggleSettings = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.stats.showSettings = !newUser.settings.stats.showSettings;
    update(newUser);
  }, [data, update]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const showSettings = data!.settings.stats.showSettings;

  return (
    <>
      <SidebarCollapseWidget title="Configuration" visible={showSettings} clickFunction={toggleSettings}>
        <StatsSettings />
      </SidebarCollapseWidget>
    </>
  );
};
