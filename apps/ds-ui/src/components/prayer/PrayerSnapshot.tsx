import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import { useGetAllItemsQuery, useMarkReadMutation, sortPrayerItems } from '../../services/PrayerService';
import { ShieldPlus, Tsunami, EyeFill } from 'react-bootstrap-icons';
import { PrayerTypes } from '@devouringscripture/common';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { ErrorLoadingDataMessage } from '../common/loading';
import { paginateItems } from '../../helpers/pagination';

const PlaceholderList = () => {
  return (
    <Card className="prayer-snapshot-card">
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
  const [currentPage, setCurrentPage] = useState(1);
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
      icon = <ShieldPlus />;
    } else if (item.type === PrayerTypes.request) {
      icon = <Tsunami />;
    } else if (item.type === PrayerTypes.confession) {
      icon = <EyeFill />;
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

  const [paginatedItems, paginationElement] = paginateItems(renderedItems, 3, currentPage, setCurrentPage);

  return (
    <Card className="prayer-snapshot-card">
      <Card.Body>
        <Form>{paginatedItems}</Form>

        {paginationElement}
      </Card.Body>
    </Card>
  );
}
