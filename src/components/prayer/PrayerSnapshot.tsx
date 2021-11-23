import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPrayerItems, selectPrayerStoreActiveitems, markComplete } from '../../stores/PrayerSlice';

const ItemText = styled.p.attrs(() => ({
  className: 'overflow-hidden',
}))`
  height: 1.1em;
`;

const createPlaceholder = () => {
  return (
    <Card className="m-0">
      <Card.Body>
        <Placeholder as={Form.Check} animation="wave">
          <Placeholder as={Form.Check} xs="12" disabled />
          <Placeholder as={Form.Check} xs="12" disabled />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export function PrayerSnapshot() {
  const prayerState = useSelector(selectPrayerStoreActiveitems);
  const dispatch = useDispatch();

  if (!prayerState.loaded) {
    dispatch(fetchAllPrayerItems());
    createPlaceholder();
  }

  const handleCheck = (id: string) => {
    dispatch(markComplete({ id, complete: true }));
  };

  const renderedItems = prayerState.items.map((item) => {
    const itemBody = (
      <ItemText>
        <strong className="me-1">{item.title}</strong>
        {item.text}
      </ItemText>
    );
    return <Form.Check type="checkbox" id={item.id} label={itemBody} checked={item.completed} onChange={() => handleCheck(item.id)} />;
  });

  return (
    <Card className="m-0">
      <Card.Body>{renderedItems}</Card.Body>
    </Card>
  );
}
