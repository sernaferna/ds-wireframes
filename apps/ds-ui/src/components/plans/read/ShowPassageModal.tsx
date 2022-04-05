import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BasePassage, getFormattedReference } from '@devouringscripture/common';
import { PassageLinkBody } from '../../read/PassageLinkBody';

interface ShowPassageModalInterface {
  passage: BasePassage;
  closeFunction(): void;
  saveFunction(): void;
  completeFunction(complete: boolean): void;
  isComplete: boolean;
  show: boolean;
}
export const ShowPassageModal = ({
  passage,
  closeFunction,
  saveFunction,
  completeFunction,
  isComplete,
  show,
}: ShowPassageModalInterface) => {
  const handleClick = () => {
    return () => {
      completeFunction(!isComplete);
    };
  };

  return (
    <Modal show={show} onHide={closeFunction} size="lg" aria-labelledby="modal-title" centered>
      <Modal.Header closeButton>
        <Modal.Title id="modal-title">{getFormattedReference(passage.osis)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PassageLinkBody passage={passage} selected={false} />
      </Modal.Body>
      <Modal.Footer>
        {isComplete ? (
          <Button onClick={handleClick()}>Mark Incomplete</Button>
        ) : (
          <Button onClick={handleClick()}>Mark Complete</Button>
        )}
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
