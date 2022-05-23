import React, { useState, useCallback, useMemo } from 'react';
import { Card, Form, Placeholder } from 'react-bootstrap';
import { useGetAllItemsQuery, useMarkReadMutation, sortPrayerItems } from '../../services/PrayerService';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { ErrorLoadingDataMessage } from '../common/loading';
import { paginateItems } from '../../helpers/pagination';
import { PrayerListItem, UserAttributes } from '@devouringscripture/common';
import { getPrayerIcon } from './PrayerCards';
import { MarkdownPreview } from '../common/MarkdownBox';

const PlaceholderList = () => {
  return (
    <Card className="m-0 reading-text">
      <Card.Body>
        <Placeholder as={Form.Check} animation="wave">
          <Placeholder as={Form.Check} xs="12" disabled />
          <Placeholder as={Form.Check} xs="12" disabled />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

interface InitialItemsParams {
  data: PrayerListItem[] | undefined;
  userData: UserAttributes | undefined;
  handleCheck(id: string): void;
}
const getInitialItems = ({ data, userData, handleCheck }: InitialItemsParams) => {
  if (data === undefined || userData === undefined) {
    return [];
  }

  const itemClicked = (id: string) => {
    return () => {
      handleCheck(id);
    };
  };

  const unreadItems = data.filter((item) => !item.completed);
  const sortPrayerAsc = userData.settings.prayer.sort === 'date-asc' ? true : false;
  const sortedItems = sortPrayerItems(unreadItems, sortPrayerAsc);

  const renderedItems = sortedItems.map((item) => {
    const icon = getPrayerIcon(item.type);

    const itemBody = (
      <div>
        {icon}
        <span className="lead">{item.title}</span> <MarkdownPreview content={item.text} shaded={false} />
      </div>
    );

    return (
      <Form.Group key={item.id}>
        <Form.Check
          label={itemBody}
          type="checkbox"
          id={item.id}
          checked={item.completed}
          onChange={itemClicked(item.id)}
        />
      </Form.Group>
    );
  });

  return renderedItems;
};

interface IPrayerSnapshot {
  showTitle?: boolean;
}
export function PrayerSnapshot({ showTitle = false }: IPrayerSnapshot) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetAllItemsQuery();
  const [markRead] = useMarkReadMutation();
  const tempObj = useGetUserByIdQuery(HARDCODED_USER_ID);
  const userData = tempObj.data;
  const userError = tempObj.error;
  const userIsLoading = tempObj.isLoading;

  const handleCheck = useCallback(
    (id: string) => {
      markRead(id);
    },
    [markRead]
  );

  const initialItems = useMemo(() => getInitialItems({ data, userData, handleCheck }), [data, userData, handleCheck]);

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

  const [paginatedItems, paginationElement] = paginateItems(initialItems, 3, currentPage, setCurrentPage, 'sm');

  return (
    <Card className="m-0 border-0">
      <Card.Body>
        {showTitle ? <h4>Prayer Items</h4> : <></>}
        <Form className="reading-text">{paginatedItems}</Form>

        {paginationElement}
      </Card.Body>
    </Card>
  );
}
