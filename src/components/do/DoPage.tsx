import React from 'react';
import { PageMainContainer, PageMainRow, PageSidebarContainerCol, PageMainContentCol } from '../styled-components/StyledComponents';
import { DoPageSettings } from './DoPageSettings';
import { SidebarCollapseWidget } from '../common/SidebarCollapseWidget';
import { ActionsWidget } from './ActionsWidget';
import Calendar from 'react-calendar';
import './Calendar.css';
import { useGetByIdQuery, useUpdateUserMutation, HARDCODED_USER_ID } from '../../services/UserService';
import { UserAttributes } from '../../datamodel/User';

export function DoPage() {
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
    <PageMainContainer>
      <PageMainRow>
        <PageSidebarContainerCol>
          <SidebarCollapseWidget title="Settings" visible={showSettings} clickFunction={toggleSettings}>
            <DoPageSettings />
          </SidebarCollapseWidget>
        </PageSidebarContainerCol>
        <PageMainContentCol>
          <Calendar />
          <ActionsWidget />
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
}
