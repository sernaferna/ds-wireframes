import React from 'react';
import {
  PageMainContainer,
  PageMainRow,
  PageMainContentCol,
  PageSidebarContainerCol,
} from '../styled-components/StyledComponents';
import { HomeSidebar } from './HomeSidebar';
import { useGetActionStatsQuery } from '../../services/ActionsService';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { VictoryPie } from 'victory';

export function Home() {
  const userObject = useGetUserByIdQuery(HARDCODED_USER_ID);
  const userData = userObject.data;
  const { data, error, isLoading } = useGetActionStatsQuery(userData?.settings.home.statsFilter);

  if (isLoading || userObject.isLoading) {
    return <LoadingMessage />;
  }
  if (error || userObject.error) {
    return <ErrorLoadingDataMessage />;
  }

  const readingStats = [
    { x: 'Read', y: data!.readLongNT },
    { x: `Didn't Read`, y: data!.dataSize - data!.readLongNT },
  ];

  return (
    <PageMainContainer>
      <PageMainRow>
        <PageSidebarContainerCol>
          <HomeSidebar />
        </PageSidebarContainerCol>
        <PageMainContentCol>
          <h1>Main Page</h1>
          <VictoryPie data={readingStats} innerRadius={100} colorScale={['green', 'grey']} />
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
}
