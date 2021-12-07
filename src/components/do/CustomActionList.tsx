import React from 'react';
import { useGetCustomActionTypesQuery } from '../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { ArchiveFill } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { getToastManager, ToastType, TOAST_FADE_TIME } from '../common/toasts/ToastManager';

export function CustomActionList() {
  const { data, error, isLoading } = useGetCustomActionTypesQuery();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const list = data!.map((item) => {
    return (
      <li key={item.id}>
        {item.displayName}{' '}
        <span className="text-danger">
          <ArchiveFill />
        </span>
      </li>
    );
  });

  return (
    <>
      <h1>Custom Action List</h1>
      <p>You've added the following custom actions to your tracker:</p>
      <ul>{list}</ul>

      <h1>Add an Item</h1>
      <Form>
        <FloatingLabel controlId="floatingItem" label="Action Type">
          <Form.Control type="text" placeholder="Action" />
        </FloatingLabel>
        <Button
          variant="primary"
          type="submit"
          onClick={(event) => {
            getToastManager().show({
              title: 'Not Implemented',
              content: 'Not yet implemented',
              duration: TOAST_FADE_TIME,
              type: ToastType.Warning,
            });
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          Send
        </Button>
      </Form>
    </>
  );
}
