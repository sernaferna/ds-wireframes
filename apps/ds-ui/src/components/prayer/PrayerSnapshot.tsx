import React, { useState, useCallback, useMemo } from 'react';
import { Card, Form, Placeholder } from 'react-bootstrap';
import { useGetAllItemsQuery, useMarkReadMutation, sortPrayerItems } from '../../services/PrayerService';
import { useUserSettings } from '../../hooks/UserSettings';
import { ErrorLoadingDataMessage } from '../common/loading';
import { paginateItems } from '../../hooks/pagination';
import { PrayerListItem, UserAttributes } from '@devouringscripture/common';
import { getPrayerIcon } from './PrayerCards';
import { MarkdownBox } from '../common/markdown/MarkdownBox';

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
        <span className="lead">{item.title}</span> <MarkdownBox.Preview content={item.text} shaded={false} />
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

/**
 * Widget to display a snapshot view of all prayer items. There is a
 * full version of the widget with a title shown (`showTitle` param
 * set to `true`), and a compact version without title (the defailt).
 *
 * @param showTitle Indicates if the full version of the widget should be shown, with the title
 */
export const PrayerSnapshot = ({ showTitle = false }: IPrayerSnapshot) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetAllItemsQuery();
  const [markRead] = useMarkReadMutation();
  const [userData, userResponseError, userLoading] = useUserSettings();

  const handleCheck = useCallback(
    (id: string) => {
      markRead(id);
    },
    [markRead]
  );

  const initialItems = useMemo(() => getInitialItems({ data, userData, handleCheck }), [data, userData, handleCheck]);

  if (isLoading || userLoading) {
    return <PlaceholderList />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  const [paginatedItems, paginationElement] = paginateItems(initialItems, 3, currentPage, setCurrentPage, 'sm');

  return (
    <Card className="m-0 border-0">
      <Card.Body>
        {showTitle && <h4>Prayer Items</h4>}
        <Form className="reading-text">{paginatedItems}</Form>

        {paginationElement}
      </Card.Body>
    </Card>
  );
};
