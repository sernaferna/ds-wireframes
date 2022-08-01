import React from 'react';
import { Modal, Button, Table, Card } from 'react-bootstrap';
import { FlagFill, Journal, JournalX } from 'react-bootstrap-icons';

interface ILegendModal {
  closeFunction(): void;
  show: boolean;
}

/**
 * Modal with a **Legend** indicating what all of the UI elements
 * indicate in the **Plans** page.
 *
 * @param closeFunction Callback function to call when the Modal is closed
 * @param show Whether the modal should be shown
 */
export const LegendModal = ({ closeFunction, show }: ILegendModal) => {
  return (
    <Modal show={show} onHide={closeFunction} size="xl" aria-labelledby="modal-title" centered>
      <Modal.Header closeButton>
        <Modal.Title id="modal-title">Legend</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h4>Plan Types</h4>
          <Card bg="light" text="dark" className="my-3 shadow">
            <Card.Header>
              <Card.Title>
                <FlagFill /> Standard plan, created by Devouring Scripture admins
              </Card.Title>
            </Card.Header>
          </Card>

          <Card bg="light" text="dark" className="my-3 shadow">
            <Card.Header>
              <Card.Title>User-created plan</Card.Title>
            </Card.Header>
          </Card>

          <h4>Icons</h4>
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

          <h4>Buttons</h4>
          <Table>
            <tbody>
              <tr>
                <th>
                  <Button disabled variant="outline-secondary">
                    Edit
                  </Button>
                </th>
                <td>Edit the plan</td>
              </tr>
              <tr>
                <th>
                  <Button disabled variant="outline-secondary">
                    Start
                  </Button>
                </th>
                <td>Join the plan to start working through it</td>
              </tr>
              <tr>
                <th>
                  <Button disabled variant="outline-secondary">
                    Leave
                  </Button>
                </th>
                <td>Stop going through the plan</td>
              </tr>
              <tr>
                <th>
                  <Button disabled variant="outline-warning">
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
        <Button variant="outline-primary" onClick={closeFunction}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
