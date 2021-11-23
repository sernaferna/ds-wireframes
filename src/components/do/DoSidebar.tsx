import React from 'react';
import Card from 'react-bootstrap/Card';
import { ActionsWidget } from './ActionsWidget';

export function DoSidebar() {
  return (
    <Card className="m-0">
      <Card.Body>
        <ActionsWidget />
      </Card.Body>
    </Card>
  );
}
