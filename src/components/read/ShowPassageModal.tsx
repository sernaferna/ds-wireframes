import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BasePassage } from '../../datamodel/Passage';
import { PassageLinkBody } from './PassageLinkBody';

interface ShowPassageModalInterface {
  passage: BasePassage;
  closeFunction(): void;
  saveFunction(): void;
  show: boolean;
}
export const ShowPassageModal = (props: ShowPassageModalInterface) => {
  return (
    <Modal show={props.show} onHide={props.closeFunction} size="lg" aria-labelledby="modal-title" centered>
      <Modal.Header closeButton>
        <Modal.Title id="modal-title">{props.passage.reference}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PassageLinkBody passage={props.passage} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeFunction}>
          Close
        </Button>
        <Button variant="primary" onClick={props.saveFunction}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
