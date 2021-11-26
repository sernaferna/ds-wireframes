import React from 'react';
import { PageMainContainer, PageMainRow, PageSidebarContainerCol, PageMainContentCol } from '../styled-components/StyledComponents';
import { PrayerCards } from './PrayerCards';
import { PrayerSidebar } from './PrayerSidebar';

export function PrayerPage() {
  return (
    <PageMainContainer>
      <PageMainRow>
        <PageSidebarContainerCol>
          <PrayerSidebar />
        </PageSidebarContainerCol>
        <PageMainContentCol>
          <PrayerCards />
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
}
