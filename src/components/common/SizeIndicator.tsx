import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { DisplayFill, LaptopFill, PhoneFill, PhoneLandscapeFill, TabletFill } from 'react-bootstrap-icons';
import { useGetByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';

export function SizeIndicator() {
  const { data, error, isLoading } = useGetByIdQuery(HARDCODED_USER_ID);
  if (isLoading) {
    return null;
  }
  if (error) {
    return null;
  }
  if (!data!.settings.showSizeIndicator) {
    return null;
  }

  return (
    <Card bg="light" className="position-absolute top-50 start-0">
      <Card.Body>
        <ButtonGroup size="lg" className="flex-wrap mb-3">
          <Button className="pe-none d-inline-block d-sm-none" variant="primary">
            <PhoneFill />
          </Button>
          <Button className="pe-none d-none d-sm-inline-block" variant="secondary">
            <PhoneFill />
          </Button>
          <Button className="pe-none d-none d-sm-inline-block d-md-none" variant="primary">
            <PhoneLandscapeFill />
          </Button>
          <Button className="pe-none d-sm-none d-md-inline-block" variant="secondary">
            <PhoneLandscapeFill />
          </Button>
          <Button className="pe-none d-none d-md-inline-block d-lg-none" variant="primary">
            <TabletFill />
          </Button>
          <Button className="pe-none d-md-none d-lg-inline-block" variant="secondary">
            <TabletFill />
          </Button>
          <Button className="pe-none d-none d-lg-inline-block d-xl-none" variant="primary">
            <DisplayFill />
          </Button>
          <Button className="pe-none d-lg-none d-xl-inline-block" variant="secondary">
            <DisplayFill />
          </Button>
          <Button className="pe-none d-none d-xl-inline-block d-xxl-none" variant="primary">
            <LaptopFill />
          </Button>
          <Button className="pe-none d-xl-none d-xxl-inline-block" variant="secondary">
            <LaptopFill />
          </Button>
          <Button className="pe-none d-none d-xxl-inline-block" variant="primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pc-display-horizontal" viewBox="0 0 16 16">
              <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0h-13Zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5ZM12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0ZM1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1ZM1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25Z" />
            </svg>
          </Button>
          <Button className="pe-none d-xxl-none" variant="secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pc-display-horizontal" viewBox="0 0 16 16">
              <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0h-13Zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5ZM12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0ZM1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1ZM1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25Z" />
            </svg>
          </Button>
        </ButtonGroup>
        <small className="d-block d-sm-none">Extra Small: &lt;576px</small>
        <small className="d-none d-sm-block d-md-none">Small: ≥576px</small>
        <small className="d-none d-md-block d-lg-none">Medium: ≥768px</small>
        <small className="d-none d-lg-block d-xl-none">Large: ≥992px</small>
        <small className="d-none d-xl-block d-xxl-none">Extra Large: ≥1200px</small>
        <small className="d-none d-xxl-block">Extra Extra Large: ≥1400px</small>
      </Card.Body>
    </Card>
  );
}
