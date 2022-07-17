import React from 'react';
import { Container } from 'react-bootstrap';

/**
 * Component displayed for any 404 errors
 */
export const FourOhFour = () => {
  return (
    <Container>
      <h1>Page not found!</h1>
      <p>Sorry, you've navigated to a part of the site we can't find.</p>
    </Container>
  );
};
