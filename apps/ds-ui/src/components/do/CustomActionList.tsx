import React, { ChangeEvent, SyntheticEvent, useState, useCallback, useMemo } from 'react';
import {
  useGetCustomActionTypesQuery,
  useNewCustomActionMutation,
  useDeleteCustomActionMutation,
} from '../../services/ActionsService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { Form, FloatingLabel, Button, Alert } from 'react-bootstrap';
import { BaseActionType, ActionType } from '@devouringscripture/common';

interface IGenerateList {
  data: ActionType[] | undefined;
  deleteCallback(id: string): void;
}
const generateList = ({ data, deleteCallback }: IGenerateList) => {
  if (data === undefined) {
    return <></>;
  }

  const list = data.map((item) => {
    return (
      <li key={item.id}>
        {item.displayName}{' '}
        <Button
          variant="outline-warning"
          size="sm"
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

/**
 * Displays any custom **Actions** that have been created by the user.
 *
 * These aren't used in the actual **Actions** functionality, so this
 * isn't "working" functionality for the demo.
 */
export const CustomActionList = () => {
  const { data, error, isLoading } = useGetCustomActionTypesQuery();
  const [actionType, setActonType] = useState('');
  const [newItem] = useNewCustomActionMutation();
  const [deleteItem] = useDeleteCustomActionMutation();
  const [viewButtonClicked, setViewButtonClicked] = useState<boolean>(false);

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
    return <ErrorLoadingDataMessage errors={[error]} />;
  }

  return (
    <>
      <Alert variant="dark" className={viewButtonClicked ? 'd-none' : 'd-block d-md-none'}>
        <Button variant="dark" onClick={() => setViewButtonClicked(true)}>
          Edit Custom Action List
        </Button>
      </Alert>
      <div className={viewButtonClicked ? 'd-block' : 'd-none d-md-block'}>
        <h4>Custom Action List</h4>
        <h3 className="lead">
          Not implemented&mdash;changes here don't impact the Actions functionality in the wireframe.
        </h3>
        <p>You've added the following custom actions to your tracker:</p>
        <ul>{list}</ul>

        <h4>Add an Item</h4>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingItem" label="Action Type">
            <Form.Control type="text" placeholder="Action" value={actionType} onChange={setText} />
          </FloatingLabel>
          <Button variant="outline-primary" type="submit">
            Send
          </Button>
        </Form>
      </div>
    </>
  );
};
