import React from 'react';
import { Container } from 'react-bootstrap';
import { Tutorial } from './tutorial/Tutorial';
import { useGetTutorialByIdQuery } from '../../services/TutorialService';
import { ErrorLoadingDataMessage, LoadingMessage } from './loading';

/**
 * Shows a tutorial for the Help screen
 */
export const Help = () => {
  const { data, error, isLoading } = useGetTutorialByIdQuery('34bd1d65-ec01-4a0a-97d8-b3729f9ae18e');

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  return (
    <Container>
      <Tutorial sections={data!.sections} />
    </Container>
  );
};
