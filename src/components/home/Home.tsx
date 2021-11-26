import React from 'react';
import { PageMainContainer, PageMainRow, PageMainContentCol, PageSidebarContainerCol } from '../styled-components/StyledComponents';
import { HomeSidebar } from './HomeSidebar';

export function Home() {
  return (
    <PageMainContainer>
      <PageMainRow>
        <PageSidebarContainerCol>
          <HomeSidebar />
        </PageSidebarContainerCol>
        <PageMainContentCol>
          <h1>Main Page</h1>
          <p>To Do</p>
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
}
