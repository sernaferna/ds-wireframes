import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BasePassage, getFormattedReference } from '@devouringscripture/common';
import { PassageLinkBody } from './PassageLinkBody';

interface ShowPassageModalInterface {
  passage: BasePassage;
  closeFunction(): void;
  saveFunction(): void;
  show: boolean;
}
export const ShowPassageModal = ({ passage, closeFunction, saveFunction, show }: ShowPassageModalInterface) => {
  return (
    <Modal show={show} onHide={closeFunction} size="lg" aria-labelledby="modal-title" centered>
      <Modal.Header closeButton>
        <Modal.Title id="modal-title">{getFormattedReference(passage.osis)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PassageLinkBody passage={passage} selected={false} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeFunction}>
          Close
        </Button>
        <Button variant="primary" onClick={saveFunction}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
