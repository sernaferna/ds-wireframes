import React from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Alert } from 'react-bootstrap';
import { ErrorResponse } from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';

/**
 * Component to display a consistent message when content is loading
 */
export function LoadingMessage() {
  return <Alert variant="primary">Loading...</Alert>;
}

/**
 * Helper function to get appropriate HTML to be displayed for an
 * `ErrorResponse` error, including child errors (if any).
 *
 * @param er The error to be displayed
 * @returns HTML to be displayed for the error, including code and details
 */
export const generateErrorStringFromError = (er: ErrorResponse): JSX.Element => {
  return (
    <div key={uuidv4()}>
      <p className="fw-bold">{`Error ${er.errorCode}`}</p>
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

type ErrorType = Error | FetchBaseQueryError | SerializedError | undefined;
interface IErrorLoadingDataMessage {
  errors: ErrorType[];
}

/**
 * Renders a consistent error message for cases where an API returns an error.
 * Handles different types of errors that can be returned from RTK API calls,
 * including (but not limited to) `ErrorResponse` errors.
 *
 * @param errors Array of error objects to be displayed; any might be undefined
 */
export function ErrorLoadingDataMessage({ errors }: IErrorLoadingDataMessage) {
  let messages: JSX.Element[] = [];

  for (const err of errors) {
    if (!err) {
      continue;
    }

    if ('data' in err) {
      messages.push(generateErrorStringFromError(err.data as ErrorResponse));
    } else if ('message' in err) {
      messages.push(<div>{(err as Error).message}</div>);
    } else if ('status' in err) {
      messages.push(<div>{`Error status code ${(err as FetchBaseQueryError).status}`}</div>);
    } else {
      messages.push(<div>{(err as SerializedError).message || 'no data'}</div>);
    }
  }

  return (
    <Alert variant="danger">
      <Alert.Heading>Error!</Alert.Heading>
      <div>Error loading data from server</div>
      {messages}
    </Alert>
  );
}

interface IClientSideErrorLoading {
  children: JSX.Element;
}

/**
 * Component for showing client-side alerts (as opposed to ones that are returned from APIs).
 *
 * @param children Content to show in the error message
 */
export const ClientSideErrorLoading = ({ children }: IClientSideErrorLoading) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Error!</Alert.Heading>
      <div>Error loading component</div>
      <div>{children}</div>
    </Alert>
  );
};
