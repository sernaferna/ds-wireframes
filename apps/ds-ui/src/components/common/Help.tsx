import React from 'react';
import { Container } from 'react-bootstrap';
import { Tutorial } from './tutorial/Tutorial';
import { useGetTutorialByIdQuery } from '../../services/TutorialService';
import { ErrorLoadingDataMessage, LoadingMessage } from './loading';

/**
 * Shows a tutorial for the Help screen
 */
export const Help = () => {
  const { data, error, isLoading } = useGetTutorialByIdQuery('1');

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage errors={[error]} />;
  }

  return (
    <Container>
      <Tutorial chapters={data!.chapters} />
    </Container>
  );
};
