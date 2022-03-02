import React, { useState, useCallback, useMemo } from 'react';
import { ToastType, TOAST_FADE_TIME, getToastManager } from '../common/toasts/ToastManager';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import styled from 'styled-components';
import { ErrorLoadingDataMessage } from '../common/loading';
import {
  useGetAllItemsQuery,
  useMarkReadMutation,
  useMarkUnreadMutation,
  sortPrayerItems,
  useDeletePrayerItemMutation,
} from '../../services/PrayerService';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { PrayerTypes, UserAttributes } from '@devouringscripture/common';
import { ShieldPlus, Tsunami, EyeFill, TrashFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { getPrayerViewFilter } from '../../stores/UISlice';
import Row from 'react-bootstrap/Row';
import { paginateItems } from '../../helpers/pagination';
import { PrayerListItem } from '@devouringscripture/common';

export const CardContainerRow = styled(Row).attrs(() => ({
  xs: '1',
  md: '2',
  lg: '2',
  xxl: '3',
}))``;

interface PrayerIconsContainerInterface {
  itemId: string;
  deleteItem(id: string): void;
  children: JSX.Element;
}
const IconsContainer = ({ itemId, deleteItem, children }: PrayerIconsContainerInterface) => {
  return (
    <div className="icons-container">
      {children}
      <TrashFill
        className="delete-icon"
        onClick={() => {
          deleteItem(itemId);
        }}
      />
    </div>
  );
};

const PlaceholderCard = () => {
  return (
    <Card className="prayer-card">
      <Card.Body className="pc-body">
        <Placeholder as={Card.Title} animation="wave">
          <Placeholder xs="12" />
        </Placeholder>
        <Placeholder as={Card.Subtitle} animation="wave">
          <Placeholder xs="12" />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs="12" />
        </Placeholder>
        <Placeholder.Button variant="primary" xs="4" />
        <Placeholder as={Card.Footer} animation="wave">
          <Placeholder xs="12" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export const getPrayerIcon = (type: string | undefined): JSX.Element => {
  if (type === undefined) {
    return <></>;
  }

  if (type === PrayerTypes.praise) {
    return <ShieldPlus />;
  } else if (type === PrayerTypes.request) {
    return <Tsunami />;
  } else if (type === PrayerTypes.confession) {
    return <EyeFill />;
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
        variant="secondary"
        onClick={() => {
          handleCompleteButton(item.id, false);
        }}
      >
        Mark Incomplete
      </Button>
    ) : (
      <Button
        variant="primary"
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
        <Card className="prayer-card">
          <Card.Body className="pc-body">
            <Card.Title>
              {item.title}{' '}
              <IconsContainer itemId={item.id} deleteItem={deleteItem}>
                {icon}
              </IconsContainer>
            </Card.Title>
            <Card.Text className="max-height-text">{item.text}</Card.Text>
            {submitButton}
          </Card.Body>
          <Card.Footer>{item.date}</Card.Footer>
        </Card>
      </Col>
    );
  });

  return items;
};

export function PrayerCards() {
  const { data, error, isLoading } = useGetAllItemsQuery();
  const [markRead] = useMarkReadMutation();
  const [markUnread] = useMarkUnreadMutation();
  const [deleteItem] = useDeletePrayerItemMutation();
  const [currentPage, setCurrentPage] = useState(1);

  const tempObj = useGetUserByIdQuery(HARDCODED_USER_ID);
  const userData = tempObj.data;
  const userIsLoading = tempObj.isLoading;
  const userError = tempObj.error;

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
        console.log(err);
      }
    },
    [markRead, markUnread]
  );

  const factoredItemList = useMemo(
    () => getItemList({ data, userData, prayerFilterString, handleCompleteButton, deleteItem }),
    [data, userData, prayerFilterString, handleCompleteButton, deleteItem]
  );

  if (isLoading || userIsLoading) {
    return (
      <CardContainerRow>
        <PlaceholderCard />
        <PlaceholderCard />
      </CardContainerRow>
    );
  }
  if (error || userError) {
    return <ErrorLoadingDataMessage />;
  }

  const [paginatedItems, paginationElement] = paginateItems(factoredItemList, 6, currentPage, setCurrentPage);

  return (
    <CardContainerRow>
      {paginatedItems}
      {paginationElement}
    </CardContainerRow>
  );
}
