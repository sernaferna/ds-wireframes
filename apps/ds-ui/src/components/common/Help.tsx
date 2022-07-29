import React from 'react';
import { Container } from 'react-bootstrap';
import { Tutorial } from './tutorial/Tutorial';
import { helpContent } from '../../tutorials/help-screen/help-content';

/**
 * Shows a tutorial for the Help screen
 */
export const Help = () => {
  return (
    <Container>
      <Tutorial sections={helpContent} />
    </Container>
  );
};
