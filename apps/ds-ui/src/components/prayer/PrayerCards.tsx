import React from 'react';
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
import { PrayerTypes } from '@devouringscripture/common/src/dm/Prayer';
import { ShieldPlus, Tsunami, EyeFill, TrashFill } from 'react-bootstrap-icons';
import { CardContainerRow } from '../styled-components/StyledComponents';

const MaxHeightText = styled(Card.Text).attrs(() => ({
  className: 'overflow-auto flex-grow-1',
}))`
  max-height: 8em;
`;

interface PrayerIconsContainerInterface {
  itemId: string;
  children: JSX.Element;
}

const PlaceholderCard = () => {
  return (
    <Card className="h-100 shadow">
      <Card.Body>
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

  const tempObj = useGetUserByIdQuery(HARDCODED_USER_ID);
  const userData = tempObj.data;
  const userIsLoading = tempObj.isLoading;
  const userError = tempObj.error;

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

    return completenessCheck && filterCheck;
  });

  const sortOption = userData!.settings.prayer.sort === 'date-asc' ? true : false;
  const sortedItems = sortPrayerItems(rawItems, sortOption);

  const items = sortedItems.map((item) => {
    const submitButton = item.completed ? (
      <Button
        className="mt-auto"
        variant="secondary"
        onClick={() => {
          handleCompleteButton(item.id, false);
        }}
      >
        Mark Incomplete
      </Button>
    ) : (
      <Button
        className="mt-auto"
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
        <div className="float-end text-primary">
          {children}
          <span
            onClick={() => {
              deleteItem(itemId);
            }}
            style={{ cursor: 'pointer' }}
          >
            <TrashFill className="text-danger" />
          </span>
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
        <Card className="h-100 shadow">
          <Card.Body className="d-flex flex-column">
            <Card.Title>
              {item.title} <IconsContainer itemId={item.id}>{icon ? icon : <></>}</IconsContainer>
            </Card.Title>
            <MaxHeightText>{item.text}</MaxHeightText>
            {submitButton}
          </Card.Body>
          <Card.Footer>{item.date}</Card.Footer>
        </Card>
      </Col>
    );
  });

  return <CardContainerRow>{items}</CardContainerRow>;
}
