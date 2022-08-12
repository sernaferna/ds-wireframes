import React, { useState, useCallback, useMemo } from 'react';
import { ToastType, TOAST_FADE_TIME, getToastManager } from '../common/toasts/ToastManager';
import { Button, Col, Card, Row } from 'react-bootstrap';
import { ErrorLoadingDataMessage } from '../common/loading';
import {
  useGetAllItemsQuery,
  useMarkReadMutation,
  useMarkUnreadMutation,
  sortPrayerItems,
  useDeletePrayerItemMutation,
} from '../../services/PrayerService';
import { useUserSettings } from '../../hooks/UserSettings';
import { PrayerTypes, UserAttributes, PrayerListItem } from '@devouringscripture/common';
import { ShieldPlus, Tsunami, EyeFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { getPrayerViewFilter } from '../../stores/UISlice';
import { paginateItems } from '../../hooks/pagination';
import { PrayerIconsContainer } from './PrayerIconsContainer';
import { PlaceholderCard } from './PlaceholderCard';
import { SetMessageFunction } from '../../hooks/ErrorsAndWarning';
import { MarkdownBox } from '../common/markdown/MarkdownBox';

export const getPrayerIcon = (type: string | undefined): JSX.Element => {
  if (type === undefined) {
    return <></>;
  }

  if (type === PrayerTypes.praise) {
    return <ShieldPlus height="20" width="20" className="align-top mt-1" />;
  } else if (type === PrayerTypes.request) {
    return <Tsunami height="20" width="20" className="align-top mt-1" />;
  } else if (type === PrayerTypes.confession) {
    return <EyeFill height="20" width="20" className="align-top mt-1" />;
  }

  return <></>;
};

interface GetItemListParams {
  data: PrayerListItem[] | undefined;
  userData: UserAttributes | undefined;
  prayerFilterString: string;
  handleCompleteButton(id: string, complete: boolean): void;
  deleteItem(id: string): void;
}
const getItemList = ({ data, userData, prayerFilterString, handleCompleteButton, deleteItem }: GetItemListParams) => {
  if (data === undefined || userData === undefined) {
    return [];
  }

  const rawItems = data.filter((item) => {
    const completenessCheck: boolean = userData.settings.prayer.showAllItems || !item.completed;
    const filterCheck: boolean =
      userData.settings.prayer.filters.showAll ||
      (userData.settings.prayer.filters.showUnLabeled && !item.type) ||
      (userData.settings.prayer.filters.showRequests && item.type === PrayerTypes.request) ||
      (userData.settings.prayer.filters.showPraise && item.type === PrayerTypes.praise) ||
      (userData.settings.prayer.filters.showConfessions && item.type === PrayerTypes.confession);

    let filterTextCheck: boolean = false;
    if (prayerFilterString.length > 0) {
      if (item.text.toLocaleLowerCase().includes(prayerFilterString.toLocaleLowerCase())) {
        filterTextCheck = true;
      }

      if (item.title) {
        if (item.title.toLocaleLowerCase().includes(prayerFilterString.toLocaleLowerCase())) {
          filterTextCheck = true;
        }
      }
    } else {
      filterTextCheck = true;
    }

    return completenessCheck && filterCheck && filterTextCheck;
  });

  const sortAscending = userData.settings.prayer.sort === 'date-asc' ? true : false;
  const sortedItems = sortPrayerItems(rawItems, sortAscending);

  const items = sortedItems.map((item) => {
    const submitButton = item.completed ? (
      <Button
        size="sm"
        variant="outline-secondary"
        onClick={() => {
          handleCompleteButton(item.id, false);
        }}
      >
        Mark Incomplete
      </Button>
    ) : (
      <Button
        size="sm"
        variant="outline-primary"
        onClick={() => {
          handleCompleteButton(item.id, true);
        }}
      >
        Mark Complete
      </Button>
    );

    const icon = getPrayerIcon(item.type);

    return (
      <Col key={item.id} className="mt-2">
        <Card className="h-100 shadow">
          <Card.Body className="d-flex flex-column">
            <Card.Title>
              {item.title}{' '}
              <PrayerIconsContainer itemId={item.id} deleteItem={deleteItem}>
                {icon}
              </PrayerIconsContainer>
            </Card.Title>
            <Card.Text as="div" className="overflow-auto flex-grow-1 reading-text" style={{ maxHeight: '8em' }}>
              <MarkdownBox.Preview content={item.text} shaded={false} />
            </Card.Text>
            <Card.Text className="text-end">{submitButton}</Card.Text>
          </Card.Body>
          <Card.Footer>{item.date}</Card.Footer>
        </Card>
      </Col>
    );
  });

  return items;
};

interface IPrayerCards {
  errorFunction: SetMessageFunction;
}

/**
 * Lists all saved prayer items as paginated cards.
 *
 * @param errorFunction Callback function for setting error messages in the parent UI
 */
export const PrayerCards = ({ errorFunction }: IPrayerCards) => {
  const { data, error, isLoading } = useGetAllItemsQuery();
  const [markRead] = useMarkReadMutation();
  const [markUnread] = useMarkUnreadMutation();
  const [deleteItem] = useDeletePrayerItemMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, userResponseError, userLoading] = useUserSettings();
  const prayerFilterString = useSelector(getPrayerViewFilter);

  const handleCompleteButton = useCallback(
    (id: string, complete: boolean) => {
      try {
        if (complete) {
          markRead(id);
        } else {
          markUnread(id);
        }
        const message = complete ? 'Successfully marked complete' : 'Successfully marked incomplete';
        getToastManager().show({
          title: 'Success!',
          content: message,
          duration: TOAST_FADE_TIME,
          type: ToastType.Success,
        });
      } catch (err) {
        errorFunction('Error retrieving prayer items from server');
      }
    },
    [markRead, markUnread, errorFunction]
  );

  const factoredItemList = useMemo(
    () => getItemList({ data, userData, prayerFilterString, handleCompleteButton, deleteItem }),
    [data, userData, prayerFilterString, handleCompleteButton, deleteItem]
  );

  if (isLoading || userLoading) {
    return (
      <Row xs="1" md="2" xxl="3">
        <PlaceholderCard />
        <PlaceholderCard />
      </Row>
    );
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  const [paginatedItems, paginationElement] = paginateItems(factoredItemList, 6, currentPage, setCurrentPage);

  return (
    <Row xs="1" md="2" lg="1" xl="2" xxl="3">
      {paginatedItems}
      {paginationElement}
    </Row>
  );
};
