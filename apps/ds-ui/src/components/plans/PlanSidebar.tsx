import React from 'react';
import { useGetUserByIdQuery, HARDCODED_USER_ID, useUpdateUserMutation } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { UserAttributes } from '@devouringscripture/common';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { PlanSettings } from './PlanSettings';
import { CurrentReadingPlan } from '../read/CurrentReadingPlan';

export const PlanSidebar = () => {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const showSettings = data!.settings.plans.showSettings;
  const showCurrentPlan = data!.settings.plans.showCurrentReadingPlan;

  const toggleSettings = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.plans.showSettings = !newUser.settings.plans.showSettings;
    update(newUser);
  };

  const toggleCurrentPlan = () => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.plans.showCurrentReadingPlan = !newUser.settings.plans.showCurrentReadingPlan;
    update(newUser);
  };

  return (
    <>
      <SidebarCollapseWidget title="Configuration" visible={showSettings} clickFunction={toggleSettings}>
        <PlanSettings />
      </SidebarCollapseWidget>

      <SidebarCollapseWidget title="Current" visible={showCurrentPlan} clickFunction={toggleCurrentPlan}>
        <CurrentReadingPlan />
      </SidebarCollapseWidget>
    </>
  );
};
