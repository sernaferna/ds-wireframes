import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Journal, JournalX } from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';

interface ILegendModal {
  closeFunction(): void;
  show: boolean;
}
export const LegendModal = ({ closeFunction, show }: ILegendModal) => {
  return (
    <Modal show={show} onHide={closeFunction} size="lg" aria-labelledby="modal-title" centered>
      <Modal.Header closeButton>
        <Modal.Title id="modal-title">Legend</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h1>Plan Types</h1>
          <Alert variant="primary">Standard plan, created by Devouring Scripture admins</Alert>

          <Alert variant="info">User-created plan</Alert>

          <h1>Icons</h1>
          <Table>
            <tbody>
              <tr>
                <th>
                  <h4>
                    <Journal />
                  </h4>
                </th>
                <td>Plan includes apocryphal books</td>
              </tr>
              <tr>
                <th>
                  <h4>
                    <JournalX />
                  </h4>
                </th>
                <td>Plan does not include apocryphal books</td>
              </tr>
            </tbody>
          </Table>

          <h1>Buttons</h1>
          <Table>
            <tbody>
              <tr>
                <th>
                  <Button disabled variant="primary">
                    Edit
                  </Button>
                </th>
                <td>Edit the plan</td>
              </tr>
              <tr>
                <th>
                  <Button disabled variant="primary">
                    Start
                  </Button>
                </th>
                <td>Join the plan to start working through it</td>
              </tr>
              <tr>
                <th>
                  <Button disabled variant="danger">
                    Leave
                  </Button>
                </th>
                <td>Stop going through the plan</td>
              </tr>
              <tr>
                <th>
                  <Button disabled variant="danger">
                    Delete
                  </Button>
                </th>
                <td>Delete the plan</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeFunction}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
