import React, { useState } from 'react';
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
import { PrayerTypes } from '@devouringscripture/common';
import { ShieldPlus, Tsunami, EyeFill, TrashFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { getPrayerViewFilter } from '../../stores/UISlice';
import Row from 'react-bootstrap/Row';
import { paginateItems } from '../../helpers/pagination';

export const CardContainerRow = styled(Row).attrs(() => ({
  xs: '1',
  md: '2',
  lg: '2',
  xxl: '3',
}))``;

interface PrayerIconsContainerInterface {
  itemId: string;
  children: JSX.Element;
}

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

  if (isLoading || userIsLoading) {
    return (
      <CardContainerRow>
        {PlaceholderCard()}
        {PlaceholderCard()}
      </CardContainerRow>
    );
  }

  if (error || userError) {
    return <ErrorLoadingDataMessage />;
  }

  const handleCompleteButton = (id: string, complete: boolean) => {
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
  };

  const showAll = userData!.settings.prayer.showAllItems;
  const showAllTypes = userData!.settings.prayer.filters.showAll;
  const showUnlabeledTypes = userData!.settings.prayer.filters.showUnLabeled;
  const showRequestTypes = userData!.settings.prayer.filters.showRequests;
  const showPraiseTypes = userData!.settings.prayer.filters.showPraise;
  const showConfessionTypes = userData!.settings.prayer.filters.showConfessions;

  const rawItems = data!.filter((item) => {
    const completenessCheck: boolean = showAll || !item.completed;
    const filterCheck: boolean =
      showAllTypes ||
      (showUnlabeledTypes && !item.type) ||
      (showRequestTypes && item.type === PrayerTypes.request) ||
      (showPraiseTypes && item.type === PrayerTypes.praise) ||
      (showConfessionTypes && item.type === PrayerTypes.confession);

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

  const sortOption = userData!.settings.prayer.sort === 'date-asc' ? true : false;
  const sortedItems = sortPrayerItems(rawItems, sortOption);

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

    const IconsContainer = ({ itemId, children }: PrayerIconsContainerInterface) => {
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

    let icon;
    if (item.type === PrayerTypes.praise) {
      icon = <ShieldPlus />;
    } else if (item.type === PrayerTypes.request) {
      icon = <Tsunami />;
    } else if (item.type === PrayerTypes.confession) {
      icon = <EyeFill />;
    }

    return (
      <Col key={item.id} className="mt-2">
        <Card className="prayer-card">
          <Card.Body className="pc-body">
            <Card.Title>
              {item.title} <IconsContainer itemId={item.id}>{icon ? icon : <></>}</IconsContainer>
            </Card.Title>
            <Card.Text className="max-height-text">{item.text}</Card.Text>
            {submitButton}
          </Card.Body>
          <Card.Footer>{item.date}</Card.Footer>
        </Card>
      </Col>
    );
  });

  const [paginatedItems, paginationElement] = paginateItems(items, 6, currentPage, setCurrentPage);

  return (
    <CardContainerRow>
      {paginatedItems}
      {paginationElement}
    </CardContainerRow>
  );
}
