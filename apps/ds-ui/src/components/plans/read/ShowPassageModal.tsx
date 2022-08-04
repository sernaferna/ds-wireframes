import React, { useMemo } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { BasePassage, getFormattedReference, ActionsForDay } from '@devouringscripture/common';
import { PassageLinkBody } from '../../read/PassageLinkBody';
import { useGetActionByDateQuery, useMarkItemReadForDayMutation } from '../../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { DateTime } from 'luxon';

const OTSHORTID = 'actions|default|shortotpass';
const OTLONGID = 'actions|default|rlotpass';
const NTSHORTID = 'actions|default|rsntpass';
const NTLONGID = 'actions|default|rlntpass';

interface IShowPassageModal {
  passage: BasePassage;
  closeFunction(): void;
  saveFunction(): void;
  completeFunction(complete: boolean): void;
  isComplete: boolean;
  show: boolean;
  dateForReading: string;
}

/**
 * Modal dialogue from the `ReadingPlanItem` component, with some
 * activities the user might want to perform (e.g. saving the
 * passage to the **Read** page, marking the reading plan item
 * complete, completing other **Actions**).
 *
 * Uses the `completeFunction` callback for marking the Reading
 * Plan item complete, but handles its own API callbacks for other
 * complete/incomplete indicators.
 *
 * @param passage The passage being read for this reading plan item
 * @param closeFunction Callback function called when the Modal is closed
 * @param saveFunction Callback function for saving this passage to the **Read** page
 * @param completeFunction Callback function for marking this Reading Plan item complete/incomplete
 * @param isComplete Indicates whether this item is complete or not
 * @param show Indicates whether the Modal should be shown or not
 * @param dateForReading The date for this Reading Plan item
 */
export const ShowPassageModal = ({
  passage,
  closeFunction,
  saveFunction,
  completeFunction,
  isComplete,
  show,
  dateForReading,
}: IShowPassageModal) => {
  const { data, error, isLoading } = useGetActionByDateQuery(dateForReading);
  const [markItemReadUnread] = useMarkItemReadForDayMutation();

  const [otShortCompleted, otLongCompleted, ntShortCompleted, ntLongCompleted] = useMemo(() => {
    if (!data) {
      return [false, false, false, false];
    }

    const otShort = data!.defaultActions.filter((item) => item.id === OTSHORTID)[0].completed;
    const otLong = data!.defaultActions.filter((item) => item.id === OTLONGID)[0].completed;
    const ntShort = data!.defaultActions.filter((item) => item.id === NTSHORTID)[0].completed;
    const ntLong = data!.defaultActions.filter((item) => item.id === NTLONGID)[0].completed;

    return [otShort, otLong, ntShort, ntLong];
  }, [data]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const handleCompleteClick = () => {
    return () => {
      completeFunction(!isComplete);
    };
  };

  const handleActionClick = (actionType: string) => {
    return () => {
      const newActions: ActionsForDay = JSON.parse(JSON.stringify(data));

      for (let i = 0; i < newActions.defaultActions.length; i++) {
        if (newActions.defaultActions[i].id === actionType) {
          newActions.defaultActions[i].completed = !newActions.defaultActions[i].completed;
        }
      }

      markItemReadUnread({
        dataForDay: newActions,
        idForDay: newActions.id,
        idForItem: actionType,
      });
    };
  };

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
        <Row className="mb-3">
          <Col>
            <Button variant="primary" onClick={saveFunction}>
              Save
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check type="checkbox" label="Completed?" checked={isComplete} onChange={handleCompleteClick()} />
          </Col>
          <Col>
            <div className="mb-2">
              Updated Actions for {DateTime.fromISO(dateForReading).toLocaleString(DateTime.DATE_FULL)}:
            </div>
            <Form.Check
              type="checkbox"
              checked={otShortCompleted}
              onChange={handleActionClick(OTSHORTID)}
              label="A Short Old Testament Passage"
            />
            <Form.Check
              type="checkbox"
              checked={otLongCompleted}
              onChange={handleActionClick(OTLONGID)}
              label="A Long Old Testament Passage"
            />
            <Form.Check
              type="checkbox"
              checked={ntShortCompleted}
              onChange={handleActionClick(NTSHORTID)}
              label="A Short New Testament Passage"
            />
            <Form.Check
              type="checkbox"
              checked={ntLongCompleted}
              onChange={handleActionClick(NTLONGID)}
              label="A Long New Testament Passage"
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeFunction}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
