import React from 'react';
import {
  PageMainContainer,
  PageMainRow,
  PageMainContentCol,
  PageSidebarContainerCol,
  CardContainerRow,
} from '../styled-components/StyledComponents';
import { HomeSidebar } from './HomeSidebar';
import { useGetActionStatsQuery } from '../../services/ActionsService';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { ReadScripture } from './stats/ReadScripture';
import { DetailedReading } from './stats/DetailedReading';
import { OldVsNew } from './stats/OldVsNew';
import { AllActivities } from './stats/AllActivities';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { GraphSorter } from './GraphSorter';

interface VisualizationCardInterface {
  title: string;
  children: JSX.Element;
}
const VisualizationCard = ({ title, children }: VisualizationCardInterface) => {
  return (
    <Col className="mt-2" style={{ width: '400px', height: '400px' }}>
      <Card className="h-100 shadow">
        <Card.Body className="d-flex flex-column">
          <Card.Title>{title}</Card.Title>
          <Card.Text as="div" className="overflow-auto flex-grow-1">
            {children}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

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

  const vizualizationList = userData!.settings.home.vizualizationsOrder
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
      }

      return (
        <VisualizationCard key={`viz-card-${index}`} title={title!}>
          {control!}
        </VisualizationCard>
      );
    });

  return (
    <PageMainContainer>
      <PageMainRow>
        <PageSidebarContainerCol>
          <HomeSidebar />
        </PageSidebarContainerCol>
        <PageMainContentCol>
          <h1>Main Page</h1>
          <Row>
            <Col className="col-12">
              <CardContainerRow>{vizualizationList}</CardContainerRow>
            </Col>
            <Col className="col-12">
              <GraphSorter />
            </Col>
          </Row>
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
}
