import React from 'react';
import { PrayerCards } from './PrayerCards';
import { Row, Col, Container } from 'react-bootstrap';
import { CreatePrayerItem } from './CreatePrayerItem';
import { PrayerSnapshot } from './PrayerSnapshot';
import { useErrorsAndWarnings } from '../../hooks/ErrorsAndWarning';

/**
 * Main page/component for the **Pray** section of the app. Sets up
 * the `AlertUI` component and passes the `addErrorMessage()`
 * callback to child components.
 */
export const PrayerPage = () => {
  const [AlertUI, addErrorMessage] = useErrorsAndWarnings();

  return (
    <Container fluid={true} className="page-main-container">
      <AlertUI />

      <Row>
        <Col xs="12" lg="8">
          <div className="d-md-none">
            <PrayerSnapshot />
          </div>
          <div className="d-none d-md-block">
            <PrayerCards errorFunction={addErrorMessage} />
          </div>
        </Col>
        <Col xs="12" lg="4">
          <CreatePrayerItem />
        </Col>
      </Row>
    </Container>
  );
};
