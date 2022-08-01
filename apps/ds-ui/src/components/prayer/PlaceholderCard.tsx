import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

/**
 * Visual placeholder UI for cases when prayer is still being loaded
 */
export const PlaceholderCard = () => {
  return (
    <Card className="h-100 shadow reading-text">
      <Card.Body className="d-flex flex-column">
        <Placeholder as={Card.Title} animation="wave">
          <Placeholder xs="12" />
        </Placeholder>
        <Placeholder as={Card.Subtitle} animation="wave">
          <Placeholder xs="12" />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs="12" />
        </Placeholder>
        <Placeholder.Button variant="outline-primary" xs="4" />
        <Placeholder as={Card.Footer} animation="wave">
          <Placeholder xs="12" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};
