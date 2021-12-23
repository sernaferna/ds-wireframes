import React from 'react';
import Alert from 'react-bootstrap/Alert';

export function LoadingMessage() {
  return <Alert variant="info">Loading...</Alert>;
}

export function ErrorLoadingDataMessage() {
  return (
    <Alert variant="danger">
      <Alert.Heading>Error!</Alert.Heading>
      <p>Error loading data from server</p>
    </Alert>
  );
}
