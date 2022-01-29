import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { LegendModal } from './LegendModal';

export const PlanSettings = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModalFunction = () => {
    setShowModal(false);
  };

  return (
    <>
      <p>Plan Settings</p>
      <Button onClick={() => setShowModal(true)}>Show Legend</Button>

      <LegendModal closeFunction={closeModalFunction} show={showModal} />
    </>
  );
};
