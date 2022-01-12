import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import { useGetAllItemsQuery, useMarkReadMutation, sortPrayerItems } from '../../services/PrayerService';
import { ShieldPlus, Tsunami, EyeFill } from 'react-bootstrap-icons';
import { PrayerTypes } from '@devouringscripture/common';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { ErrorLoadingDataMessage } from '../common/loading';

const PlaceholderList = () => {
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
  const tempObj = useGetUserByIdQuery(HARDCODED_USER_ID);
  const userData = tempObj.data;
  const userError = tempObj.error;
  const userIsLoading = tempObj.isLoading;

  if (isLoading || userIsLoading) {
    return <PlaceholderList />;
  }

  if (error || userError) {
    if (error) {
      return <ErrorLoadingDataMessage theError={error} />;
    } else {
      return <ErrorLoadingDataMessage theError={userError} />;
    }
  }

  const unreadItems = data!.filter((item) => !item.completed);
  const sortPrayerAsc = userData!.settings.prayer.sort === 'date-asc' ? true : false;
  const sortedItems = sortPrayerItems(unreadItems, sortPrayerAsc);

  const handleCheck = (id: string) => {
    markRead(id);
  };

  const renderedItems = sortedItems.map((item) => {
    let icon;
    if (item.type === PrayerTypes.praise) {
      icon = <ShieldPlus className="d-inline me-1 text-primary" />;
    } else if (item.type === PrayerTypes.request) {
      icon = <Tsunami className="d-inline me-1 text-primary" />;
    } else if (item.type === PrayerTypes.confession) {
      icon = <EyeFill className="d-inline me-1 text-primary" />;
    }

    const itemBody = (
      <p>
        {icon}
        <span className="lead">{item.title}</span> {item.text}
      </p>
    );

    return (
      <Form.Group key={item.id}>
        <Form.Check
          label={itemBody}
          type="checkbox"
          id={item.id}
          checked={item.completed}
          onChange={() => handleCheck(item.id)}
        />
      </Form.Group>
    );
  });

  return (
    <Card className="m-0 reading-text">
      <Card.Body>
        <Form>{renderedItems}</Form>
      </Card.Body>
    </Card>
  );
}
