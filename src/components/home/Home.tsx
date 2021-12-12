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
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

interface VisualizationCardInterface {
  title: string;
  children: JSX.Element;
}
const VisualizationCard = ({ title, children }: VisualizationCardInterface) => {
  return (
    <Col className="mt-2" style={{ maxWidth: '400px' }}>
      <Card className="h-100 shadow">
        <Card.Body className="d-flex flex-column">
          <Card.Title>{title}</Card.Title>
          <Card.Text className="overflow-auto flex-grow-1" style={{ maxHeight: '50em' }}>
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

  return (
    <PageMainContainer>
      <PageMainRow>
        <PageSidebarContainerCol>
          <HomeSidebar />
        </PageSidebarContainerCol>
        <PageMainContentCol>
          <h1>Main Page</h1>
          <CardContainerRow>
            <VisualizationCard title="Read Scripture">
              <ReadScripture stats={data!} />
            </VisualizationCard>
            <VisualizationCard title="Scripture Reading Stats">
              <DetailedReading stats={data!} />
            </VisualizationCard>
            <VisualizationCard title="Old vs. New Testaments">
              <OldVsNew stats={data!} />
            </VisualizationCard>
          </CardContainerRow>
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
}
