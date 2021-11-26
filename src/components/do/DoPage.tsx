import React from 'react';
import { PageMainContainer, PageMainRow, PageSidebarContainerCol, PageMainContentCol } from '../styled-components/StyledComponents';
import { ActionsWidget } from './ActionsWidget';
import Calendar from 'react-calendar';
import './Calendar.css';
import { DoSidebar } from './DoSidebar';

export function DoPage() {
  return (
    <PageMainContainer>
      <PageMainRow>
        <PageSidebarContainerCol>
          <DoSidebar />
        </PageSidebarContainerCol>
        <PageMainContentCol>
          <Calendar />
          <ActionsWidget />
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
}
