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
        </Col>
      </Row>
    </Container>
  );
};
