import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

interface IVisualizationCard {
  title: string;
  children: JSX.Element;
}
export const VisualizationCard = ({ title, children }: IVisualizationCard) => {
  return (
    <Col className="mt-2" style={{ height: '400px', width: '400px' }}>
      <Card className="h-100 shadow">
        <Card.Body className="d-flex flex-column">
          <Card.Title>{title}</Card.Title>
          <Card.Text as="div" className="overflow-auto flex-grow-1">
            {children}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
