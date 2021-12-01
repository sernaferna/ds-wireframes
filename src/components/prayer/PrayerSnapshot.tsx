import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import styled from 'styled-components';
import { useGetAllItemsQuery, useMarkReadMutation } from '../../services/PrayerService';
import { ShieldPlus, Tsunami, EyeFill } from 'react-bootstrap-icons';
import { PrayerTypes } from '../../datamodel/PrayerListItem';

const ItemText = styled.p.attrs(() => ({}))`
  height: 1.2em;
`;

const ItemTitle = styled.div.attrs(() => ({
  className: 'overflow-hidden fw-bold',
}))`
  max-width: 100%;
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
    const itemTitle = <ItemTitle>{item.title}</ItemTitle>;

    let icon;
    if (item.type === PrayerTypes.praise) {
      icon = <ShieldPlus className="d-inline me-1 text-primary" />;
    } else if (item.type === PrayerTypes.request) {
      icon = <Tsunami className="d-inline me-1 text-primary" />;
    } else if (item.type === PrayerTypes.confession) {
      icon = <EyeFill className="d-inline me-1 text-primary" />;
    }

    const itemBody = (
      <ItemText>
        {icon ? icon : ''}
        {item.text}
      </ItemText>
    );

    return (
      <>
        <Form.Check
          key={item.id}
          label={itemTitle}
          type="checkbox"
          id={item.id}
          checked={item.completed}
          onChange={() => handleCheck(item.id)}
        />
        <Form.Label htmlFor={item.id}>{itemBody}</Form.Label>
      </>
    );
  });

  return (
    <Card className="m-0">
      <Card.Body>
        <Form>{renderedItems}</Form>
      </Card.Body>
    </Card>
  );
}
