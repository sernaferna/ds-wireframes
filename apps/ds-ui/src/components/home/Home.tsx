import React, { useMemo } from 'react';
import { HomeSidebar } from './HomeSidebar';
import { useGetActionStatsQuery } from '../../services/ActionsService';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { ReadScripture } from './stats/ReadScripture';
import { DetailedReading } from './stats/DetailedReading';
import { OldVsNew } from './stats/OldVsNew';
import { AllActivities } from './stats/AllActivities';
import { Prayed } from './stats/Prayed';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { GraphSorter } from './GraphSorter';
import { UserAttributes, ActionStats } from '@devouringscripture/common';
import { VisualizationCard } from './VisualizationCard';

const getVizualizationList = (userData: UserAttributes | undefined, data: ActionStats | undefined) => {
  if (userData === undefined || data === undefined) {
    return [];
  }

  return userData.settings.home.vizualizationsOrder
    .filter((item) => item.active)
    .sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }

      return 0;
    })
    .map((item, index) => {
      let title: string;
      let control: JSX.Element;

      switch (item.name) {
        case 'ReadScripture':
          title = 'Read Scripture';
          control = <ReadScripture stats={data!} />;
          break;
        case 'DetailedReading':
          title = 'Detailed Reading Stats';
          control = <DetailedReading stats={data!} />;
          break;
        case 'OldVsNew':
          title = 'Old vs. New Testaments';
          control = <OldVsNew stats={data!} />;
          break;
        case 'AllActivities':
          title = 'All Activity';
          control = <AllActivities stats={data!} />;
          break;
        case 'Prayed':
          title = 'Prayed';
          control = <Prayed stats={data!} />;
      }

      return (
        <VisualizationCard key={`viz-card-${index}`} title={title!}>
          {control!}
        </VisualizationCard>
      );
    });
};

export function Home() {
  const userObject = useGetUserByIdQuery(HARDCODED_USER_ID);
  const userData = userObject.data;
  const { data, error, isLoading } = useGetActionStatsQuery(userData?.settings.home.statsFilter);

  const vizualizationList = useMemo(() => getVizualizationList(userData, data), [userData, data]);

  if (isLoading || userObject.isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }
  if (userObject.error) {
    return <ErrorLoadingDataMessage theError={userObject.error} />;
  }

  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <HomeSidebar />
        </Col>
        <Col className="page-main-content-col">
          <Row>
            <Col className="home-viz-container">
              <Row className="container-row">{vizualizationList}</Row>
            </Col>
            <Col className="home-graph-sorter-container">
              <GraphSorter />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
