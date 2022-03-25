import React, { ChangeEvent, SyntheticEvent, useState, useCallback, useMemo } from 'react';
import {
  useGetCustomActionTypesQuery,
  useNewCustomActionMutation,
  useDeleteCustomActionMutation,
} from '../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { BaseActionType, ActionType } from '@devouringscripture/common';

interface GenerateListParams {
  data: ActionType[] | undefined;
  deleteCallback(id: string): void;
}
const generateList = ({ data, deleteCallback }: GenerateListParams) => {
  if (data === undefined) {
    return <></>;
  }

  const list = data.map((item) => {
    return (
      <li key={item.id}>
        {item.displayName}{' '}
        <Button
          size="sm"
          variant="danger"
          onClick={() => {
            deleteCallback(item.id);
          }}
        >
          Delete
        </Button>
      </li>
    );
  });

  return list;
};

export const CustomActionList = () => {
  const { data, error, isLoading } = useGetCustomActionTypesQuery();
  const [actionType, setActonType] = useState('');
  const [newItem] = useNewCustomActionMutation();
  const [deleteItem] = useDeleteCustomActionMutation();

  const setText = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setActonType(event.target.value);
    },
    [setActonType]
  );

  const handleSubmit = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      const action: BaseActionType = {
        displayName: actionType,
      };

      newItem(action);
    },
    [newItem, actionType]
  );

  const list = useMemo(() => generateList({ data, deleteCallback: deleteItem }), [data, deleteItem]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  return (
    <>
      <h1>Custom Action List</h1>
      <p className="lead">
        Not implemented&mdash;changes here don't impact the Actions functionality in the wireframe.
      </p>
      <p>You've added the following custom actions to your tracker:</p>
      <ul>{list}</ul>

      <h1>Add an Item</h1>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingItem" label="Action Type">
          <Form.Control type="text" placeholder="Action" value={actionType} onChange={setText} />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </>
  );
};
