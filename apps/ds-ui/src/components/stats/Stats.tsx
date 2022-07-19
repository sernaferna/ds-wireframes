import React, { useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { UserAttributes, ActionStats } from '@devouringscripture/common';
import { ReadScripture } from './graphs/ReadScripture';
import { DetailedReading } from './graphs/DetailedReading';
import { OldVsNew } from './graphs/OldVsNew';
import { AllActivities } from './graphs/AllActivities';
import { Prayed } from './graphs/Prayed';
import { VisualizationCard } from './VisualizationCard';
import { useUserSettings } from '../../hooks/UserSettings';
import { useGetActionStatsQuery } from '../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { GraphSorter } from './GraphSorter/GraphSorter';

const getVisualizationList = (userData: UserAttributes | undefined, data: ActionStats | undefined) => {
  if (userData === undefined || data === undefined) {
    return [];
  }

  return userData.settings.stats.vizualizationsOrder
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
          title = 'All Activities';
          control = <AllActivities stats={data!} />;
          break;
        case 'Prayed':
          title = 'Prayer';
          control = <Prayed stats={data!} />;
      }

      return (
        <VisualizationCard key={`viz-card-${index}`} title={title!}>
          {control!}
        </VisualizationCard>
      );
    });
};

/**
 * Main page/component for the **Stats** section of the app.
 */
export const Stats = () => {
  const [userData, userResponseError, userLoading] = useUserSettings();
  const { data, error, isLoading } = useGetActionStatsQuery(userData?.settings.stats.statsFilter);

  const vizList = useMemo(() => getVisualizationList(userData, data), [userData, data]);

  if (isLoading || userLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col xs="12">
          <Row xs="1" md="2" xxl="3">
            {vizList}
          </Row>
        </Col>
        <Col xs="12" className="mt-4">
          <GraphSorter />
        </Col>
      </Row>
    </Container>
  );
};
