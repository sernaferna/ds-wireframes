import React, { useCallback } from 'react';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { ReadPageSettings } from './ReadPageSettings';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { UserAttributes } from '@devouringscripture/common';
import { CurrentReadingPlan } from './CurrentReadingPlan';

export const ReadSidebar = () => {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  const toggleSettings = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.read.showSettings = !newUser.settings.read.showSettings;
    update(newUser);
  }, [data, update]);

  const togglePlan = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.read.showReadingPlan = !newUser.settings.read.showReadingPlan;
    update(newUser);
  }, [data, update]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const showSettings = data!.settings.read.showSettings;
  const showReadingPlan = data!.settings.read.showReadingPlan;

  return (
    <>
      <SidebarCollapseWidget title="Configuration" visible={showSettings} clickFunction={toggleSettings}>
        <ReadPageSettings />
      </SidebarCollapseWidget>

      <SidebarCollapseWidget title="Reading Plan" visible={showReadingPlan} clickFunction={togglePlan}>
        <CurrentReadingPlan />
      </SidebarCollapseWidget>
    </>
  );
};
