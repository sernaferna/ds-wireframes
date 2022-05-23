import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { LegendModal } from './LegendModal';

export const PlanSettings = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModalFunction = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  return (
    <>
      <p>Plan Settings</p>
      <Button onClick={() => setShowModal(true)}>Show Legend</Button>

      <LegendModal closeFunction={closeModalFunction} show={showModal} />
    </>
  );
};
