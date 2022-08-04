import React from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { getFormattedReference, BasePassage } from '@devouringscripture/common';
import { PassageLinkBody } from './PassageLinkBody';

interface IPassageLauncherModal {
  show: boolean;
  closeFunction(): void;
  saveFunction(): void;
  passage: BasePassage;
}

/**
 * Modal dialog to show a passage that's being launched; leverages
 * `PassageLinkBody` for the actual body to be rendered.
 *
 * @param show Indicates if the modal should be shown
 * @param closeFunction Callback function to call when the modal is closed
 * @param saveFunction Callback function to call if the user choosed to save the passage
 * @param passage The passage to be rendered
 */
export const PassageLauncherModal = ({ show, closeFunction, saveFunction, passage }: IPassageLauncherModal) => {
  return (
    <Modal show={show} onHide={closeFunction} aria-labelledby="modal-title" centered>
      <Modal.Header closeButton>
        <Modal.Title id="modal-title">{getFormattedReference(passage.osis)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col>
            <PassageLinkBody passage={passage} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={saveFunction}>
              Save
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
