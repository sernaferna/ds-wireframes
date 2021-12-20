import React from 'react';
import {
  PageMainContainer,
  PageMainRow,
  PageSidebarContainerCol,
  PageMainContentCol,
} from '../styled-components/StyledComponents';
import { ReadSidebar } from './ReadSidebar';
import { PassageCards } from './PassageCards';
import { PassageLauncher } from './PassageLauncher';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';

export const ReadPage = () => {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  return (
    <PageMainContainer>
      <PageMainRow>
        <PageSidebarContainerCol>
          <ReadSidebar />
        </PageSidebarContainerCol>
        <PageMainContentCol>
          <PassageLauncher defaultVersion={data!.settings.read.defaultVersion} />
          <PassageCards />
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
};
