import React from 'react';
import Form from 'react-bootstrap/Form';
import { useState, ChangeEvent, SyntheticEvent } from 'react';
import Col from 'react-bootstrap/Col';
import { useNewItemMutation } from '../../services/PrayerService';
import Button from 'react-bootstrap/Button';

export function CreatePrayerItem() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [touched, setTouched] = useState(false);
  const [newPrayer] = useNewItemMutation();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTouched(true);
  };

  const handleBodyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
    setTouched(true);
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    newPrayer({ title: title, text: body, completed: false });
  };

  const titleIsValid = !touched || title.length > 0 ? true : false;
  const bodyIsValid = !touched || body.length > 0 ? true : false;

  return (
    <>
      <h1>New Prayer Request</h1>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group as={Col} xs="12" className="position-relative">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={handleTitleChange}
            type="text"
            placeholder="Title"
            name="title"
            isValid={titleIsValid}
            isInvalid={!titleIsValid}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            Please enter a valid title
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs="12" className="position-relative">
          <Form.Label>Text</Form.Label>
          <Form.Control
            value={body}
            onChange={handleBodyChange}
            as="textarea"
            rows={4}
            name="body"
            isValid={bodyIsValid}
            isInvalid={!bodyIsValid}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            Please enter some text
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!touched || !titleIsValid || !bodyIsValid}>
          Submit
        </Button>
      </Form>
    </>
  );
}
