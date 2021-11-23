import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export interface SizeIndicatorProps {
  show: boolean;
}

export function SizeIndicator(props: SizeIndicatorProps) {
  if (!props.show) {
    return null;
  }

  return (
    <Card bg="light" className="position-absolute top-50 start-0">
      <Card.Body>
        <ButtonGroup size="sm" className="flex-wrap mb-3">
          <Button className="pe-none d-inline-block d-sm-none" variant="primary">
            XS
          </Button>
          <Button className="pe-none d-none d-sm-inline-block" variant="secondary">
            XS
          </Button>
          <Button className="pe-none d-none d-sm-inline-block d-md-none" variant="primary">
            SM
          </Button>
          <Button className="pe-none d-sm-none d-md-inline-block" variant="secondary">
            SM
          </Button>
          <Button className="pe-none d-none d-md-inline-block d-lg-none" variant="primary">
            MD
          </Button>
          <Button className="pe-none d-md-none d-lg-inline-block" variant="secondary">
            MD
          </Button>
          <Button className="pe-none d-none d-lg-inline-block d-xl-none" variant="primary">
            LG
          </Button>
          <Button className="pe-none d-lg-none d-xl-inline-block" variant="secondary">
            LG
          </Button>
          <Button className="pe-none d-none d-xl-inline-block d-xxl-none" variant="primary">
            XL
          </Button>
          <Button className="pe-none d-xl-none d-xxl-inline-block" variant="secondary">
            XL
          </Button>
          <Button className="pe-none d-none d-xxl-inline-block" variant="primary">
            XXL
          </Button>
          <Button className="pe-none d-xxl-none" variant="secondary">
            XXL
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
