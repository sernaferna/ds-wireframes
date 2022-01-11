import React from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import Alert from 'react-bootstrap/Alert';

export function LoadingMessage() {
  return <Alert variant="info">Loading...</Alert>;
}

interface ErrorLoadingDataInterface {
  theError?: Error | FetchBaseQueryError | SerializedError;
}
export function ErrorLoadingDataMessage({ theError }: ErrorLoadingDataInterface) {
  let message = '';
  if (theError) {
    if ('message' in theError) {
      message = (theError as Error).message;
    } else if ('status' in theError) {
      message = `error status code ${(theError as FetchBaseQueryError).status}` || 'no data';
    } else {
      message = (theError as SerializedError).message || 'no data';
    }
  }

  return (
    <Alert variant="danger">
      <Alert.Heading>Error!</Alert.Heading>
      <p>Error loading data from server{message.length > 0 ? `, ${message}` : ''}</p>
    </Alert>
  );
}
