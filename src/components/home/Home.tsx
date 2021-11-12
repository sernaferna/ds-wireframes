import React from 'react';
import { Container } from 'react-bootstrap';
import { PrayerList } from '../prayer/PrayerList';

export class Home extends React.Component {
  render() {
    return (
      <Container className="m-0">
        <h1>Devouring Scripture</h1>
        <PrayerList fullList={false} />
      </Container>
    );
  }
}
