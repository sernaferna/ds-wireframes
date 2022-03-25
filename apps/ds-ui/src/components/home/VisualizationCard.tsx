import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

interface VisualizationCardInterface {
  title: string;
  children: JSX.Element;
}
export const VisualizationCard = ({ title, children }: VisualizationCardInterface) => {
  return (
    <Col className="vizualization-card">
      <Card className="vizualization-card-content">
        <Card.Body className="vizualization-card-body">
          <Card.Title>{title}</Card.Title>
          <Card.Text as="div" className="vizualization-card-text">
            {children}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
