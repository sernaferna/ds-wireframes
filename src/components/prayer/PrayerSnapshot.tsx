import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import styled from 'styled-components';
import { useGetAllItemsQuery, useMarkReadMutation } from '../../services/PrayerService';

const ItemText = styled.p.attrs(() => ({}))`
  height: 1.2em;
`;

const ItemTitle = styled.div.attrs(() => ({
  className: 'badge rounded-pill bg-secondary overflow-hidden me-1',
}))`
  max-width: 33%;
  height: 1.2em;
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
  const { data, error, isLoading } = useGetAllItemsQuery();
  const [markRead] = useMarkReadMutation();

  if (isLoading) {
    return createPlaceholder();
  }

  if (error) {
    return <div>Error!</div>;
  }

  const unreadItems = data!.filter((item) => !item.completed);

  const handleCheck = (id: string) => {
    markRead(id);
  };

  const renderedItems = unreadItems.map((item) => {
    const itemBody = (
      <ItemText>
        <ItemTitle>{item.title}</ItemTitle>
        {item.text}
      </ItemText>
    );
    return <Form.Check key={item.id} type="checkbox" id={item.id} label={itemBody} checked={item.completed} onChange={() => handleCheck(item.id)} />;
  });

  return (
    <Card className="m-0">
      <Card.Body>{renderedItems}</Card.Body>
    </Card>
  );
}
