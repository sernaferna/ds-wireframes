import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { LegendModal } from './LegendModal';

/**
 * Settings page for the **Plan** section of the app
 */
export const PlanSettings = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModalFunction = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show Legend</Button>

      <LegendModal closeFunction={closeModalFunction} show={showModal} />
    </>
  );
};
