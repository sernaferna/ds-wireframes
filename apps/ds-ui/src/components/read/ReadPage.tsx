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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PassageNotes } from './notes/PassageNotes';

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
          <Row xs="12">
            <PassageLauncher defaultVersion={data!.settings.read.defaultVersion} />
          </Row>
          <Row>
            <Col xs="12" md="5">
              <PassageCards />
            </Col>
            <Col xs="12" md="7">
              <PassageNotes />
            </Col>
          </Row>
        </PageMainContentCol>
      </PageMainRow>
    </PageMainContainer>
  );
};
