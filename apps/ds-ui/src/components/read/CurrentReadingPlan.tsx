import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ShowPassageModal } from './ShowPassageModal';
import { BasePassage } from '@devouringscripture/common';
import { useNewItemMutation } from '../../services/PassagesService';
import Alert from 'react-bootstrap/Alert';

export const CurrentReadingPlan = () => {
  const [showModal, setShowModal] = useState(false);
  const [newItem] = useNewItemMutation();

  const closeModalFunction = () => {
    setShowModal(false);
  };

  const passage: BasePassage = {
    osis: 'John.1.1',
    version: 'ESV',
  };

  const saveFunction = () => {
    const { osis, version } = passage;

    const newPassage: BasePassage = {
      osis,
      version,
    };
    newItem(newPassage);

    closeModalFunction();
  };

  return (
    <Alert variant="danger">
      <Alert.Heading>Today's Readings</Alert.Heading>

      <p className="lead">Not yet implemented</p>

      <Button variant="outline-danger" onClick={() => setShowModal(true)}>
        Launch {passage.osis}/{passage.version}
      </Button>

      <ShowPassageModal
        show={showModal}
        closeFunction={closeModalFunction}
        saveFunction={saveFunction}
        passage={passage}
      />
    </Alert>
  );
};
