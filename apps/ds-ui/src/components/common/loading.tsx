import React from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import Alert from 'react-bootstrap/Alert';
import { ErrorResponse } from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';

export function LoadingMessage() {
  return <Alert className="loading-message">Loading...</Alert>;
}

export const generateErrorStringFromError = (er: ErrorResponse): JSX.Element => {
  return (
    <div className="details" key={uuidv4()}>
      <p>{`Error ${er.errorCode}`}</p>
      <ul>
        {er.errors.map((item, index) => (
          <li key={`error-msg-detail-${index}`}>
            {item.message} {item.field && `; ${item.field}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface IErrorLoadingDataMessage {
  theError?: Error | FetchBaseQueryError | SerializedError;
}
export function ErrorLoadingDataMessage({ theError }: IErrorLoadingDataMessage) {
  let message: string | JSX.Element = '';
  if (theError) {
    if ('data' in theError) {
      message = generateErrorStringFromError(theError.data as ErrorResponse);
    } else if ('message' in theError) {
      message = (theError as Error).message;
    } else if ('status' in theError) {
      message = `error status code ${(theError as FetchBaseQueryError).status}` || 'no data';
    } else {
      message = (theError as SerializedError).message || 'no data';
    }
  }

  return (
    <Alert className="error-message">
      <Alert.Heading>Error!</Alert.Heading>
      <div>Error loading data from server</div>
      <div>{message}</div>
    </Alert>
  );
}
