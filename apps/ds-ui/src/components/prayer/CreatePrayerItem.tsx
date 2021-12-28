import React, { useEffect, useState, ChangeEvent, SyntheticEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useNewItemMutation } from '../../services/PrayerService';
import Button from 'react-bootstrap/Button';
import { ShieldPlus, Tsunami, EyeFill } from 'react-bootstrap-icons';
import { PrayerTypes } from '@devouringscripture/common/src/dm/PrayerTypes';

const selectedIconClasses = 'bg-success text-light';
const unselectedIconClasses = 'text-light bg-secondary';

const praisePopover = (
  <Popover id="praise-popover">
    <Popover.Header>Praise</Popover.Header>
    <Popover.Body>This icon indicates a praise request.</Popover.Body>
  </Popover>
);

const requestPopover = (
  <Popover id="praise-popover">
    <Popover.Header>Request</Popover.Header>
    <Popover.Body>This icon indicates a request for help from God.</Popover.Body>
  </Popover>
);

const confessionPopover = (
  <Popover id="praise-popover">
    <Popover.Header>Confession</Popover.Header>
    <Popover.Body>This icon indicates a confession being prayed to God.</Popover.Body>
  </Popover>
);

export function CreatePrayerItem({ confession = false }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState<string | undefined>(undefined);
  const [newPrayer] = useNewItemMutation();
  const [validatedFields, setValidatedFields] = useState({
    bodyIsValid: false,
    bodyIsInvalid: false,
  });

  useEffect(() => {
    if (confession) {
      setType(PrayerTypes.confession);
    }
  }, [confession]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const formIsValid = (): boolean => {
    let isValid = true;
    const newValidatedFields = JSON.parse(JSON.stringify(validatedFields));

    if (body.length < 1) {
      newValidatedFields.bodyIsInvalid = true;
      newValidatedFields.bodyIsValid = false;
      isValid = false;
    } else {
      newValidatedFields.bodyIsInvalid = false;
      newValidatedFields.bodyIsValid = true;
    }

    setValidatedFields(newValidatedFields);

    return isValid;
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    if (formIsValid()) {
      newPrayer({ title, text: body, completed: false, type });
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const setPrayerType = (newType: string) => {
    if (type === newType) {
      setType(undefined);
    } else {
      setType(newType);
    }
  };

  return (
    <div className={confession ? 'alert alert-danger' : 'alert alert-primary'}>
      <h1>{confession ? 'Confession' : 'New Prayer Request'}</h1>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group as={Col} xs="12" className="position-relative">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={handleTitleChange} type="text" placeholder="Title" name="title" />
        </Form.Group>
        <Form.Group as={Col} xs="12" className="position-relative">
          <Form.Label>Text</Form.Label>
          <Form.Control
            value={body}
            onChange={handleBodyChange}
            as="textarea"
            rows={4}
            name="body"
            isValid={validatedFields.bodyIsValid}
            isInvalid={validatedFields.bodyIsInvalid}
            placeholder="Prayer request"
          />
          <Form.Control.Feedback type="invalid" tooltip>
            Please enter some text
          </Form.Control.Feedback>
        </Form.Group>
        {confession ? null : (
          <Stack direction="horizontal" className="h1 m-3" gap={5}>
            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={praisePopover}>
              <ShieldPlus
                className={type === PrayerTypes.praise ? selectedIconClasses : unselectedIconClasses}
                onClick={() => setPrayerType(PrayerTypes.praise)}
              />
            </OverlayTrigger>
            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={requestPopover}>
              <Tsunami
                className={type === PrayerTypes.request ? selectedIconClasses : unselectedIconClasses}
                onClick={() => setPrayerType(PrayerTypes.request)}
              />
            </OverlayTrigger>
            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={confessionPopover}>
              <EyeFill
                className={type === PrayerTypes.confession ? selectedIconClasses : unselectedIconClasses}
                onClick={() => setPrayerType(PrayerTypes.confession)}
              />
            </OverlayTrigger>
          </Stack>
        )}
        <Form.Group className="mt-2">
          <Button variant={confession ? 'danger' : 'primary'} type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
