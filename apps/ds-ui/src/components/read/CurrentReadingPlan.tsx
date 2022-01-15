import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ShowPassageModal } from './ShowPassageModal';
import { BasePassage } from '@devouringscripture/common';
import { useNewItemMutation } from '../../services/PassagesService';
import Alert from 'react-bootstrap/Alert';
import { getOSISForReference } from '@devouringscripture/refparse';

export const CurrentReadingPlan = () => {
  const [showModal, setShowModal] = useState(false);
  const [newItem] = useNewItemMutation();

  const closeModalFunction = () => {
    setShowModal(false);
  };

  const passage: BasePassage = {
    reference: 'John.1.1',
    version: 'ESV',
  };

  const saveFunction = () => {
    const { reference, version } = passage;

    const newPassage: BasePassage = {
      reference: getOSISForReference(reference),
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
        Launch {passage.reference}/{passage.version}
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
