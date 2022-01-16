import React from 'react';
import { ReadSidebar } from './ReadSidebar';
import { PassageCards } from './PassageCards';
import { PassageLauncher } from './PassageLauncher';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { PassageNotes } from './notes/PassageNotes';
import { AllNotes } from './notes/AllNotes';

export const ReadPage = () => {
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <ReadSidebar />
        </Col>
        <Col className="page-main-content-col">
          <Row>
            <Col className="read-passagelauncher-col">
              <PassageLauncher defaultVersion={data!.settings.read.defaultVersion} />
            </Col>
            <Col className="read-passagecard-col">
              <PassageCards />
            </Col>
            <Col className="read-passagenotes-col">
              <PassageNotes />
            </Col>
            <Col className="read-all-notes-col">
              <AllNotes />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
