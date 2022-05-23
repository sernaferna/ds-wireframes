import React, { useCallback } from 'react';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { useGetUserByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import { UserAttributes } from '@devouringscripture/common';
import { DoPageSettings } from './DoPageSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';

export function DoSidebar() {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  const [update] = useUpdateUserMutation();

  const toggleSettings = useCallback(() => {
    const newUser: UserAttributes = JSON.parse(JSON.stringify(data));
    newUser.settings.actions.showSettings = !newUser.settings.actions.showSettings;
    update(newUser);
  }, [update, data]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  return (
    <>
      <SidebarCollapseWidget
        title="Configuration"
        visible={data!.settings.actions.showSettings}
        clickFunction={toggleSettings}
      >
        <DoPageSettings />
      </SidebarCollapseWidget>
    </>
  );
}
