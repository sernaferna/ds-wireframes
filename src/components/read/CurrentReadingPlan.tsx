import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ShowPassageModal } from './ShowPassageModal';
import { Passage } from '../../datamodel/Passage';
import { getToastManager, ToastType, TOAST_FADE_TIME } from '../common/toasts/ToastManager';

export const CurrentReadingPlan = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModalFunction = () => {
    setShowModal(false);
  };

  const passage: Passage = {
    id: 'blah',
    date: 'blah',
    reference: 'Rev 1:1',
    version: 'ESV',
  };

  const saveFunction = () => {
    getToastManager().show({
      title: 'Save',
      content: `${passage.reference} / ${passage.version} would be saved`,
      type: ToastType.Success,
      duration: TOAST_FADE_TIME,
    });

    closeModalFunction();
  };

  return (
    <>
      <div>current reading plan</div>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Launch
      </Button>

      <ShowPassageModal
        show={showModal}
        closeFunction={closeModalFunction}
        saveFunction={saveFunction}
        passage={passage}
      />
    </>
  );
};
