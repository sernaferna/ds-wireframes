import React from 'react';
import { ToastType, TOAST_FADE_TIME, getToastManager } from '../common/toasts/ToastManager';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import styled from 'styled-components';
import { ErrorLoadingDataMessage } from '../common/loading';
import { useGetAllItemsQuery, useMarkReadMutation, useMarkUnreadMutation } from '../../services/PrayerService';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { PrayerTypes } from '../../datamodel/PrayerListItem';
import { ShieldPlus, Tsunami, EyeFill } from 'react-bootstrap-icons';

const MaxHeightText = styled(Card.Text).attrs(() => ({
  className: 'overflow-auto flex-grow-1',
}))`
  max-height: 8em;
`;

const CardContainerRow = styled(Row).attrs(() => ({
  xs: '1',
  md: '2',
  lg: '2',
  xxl: '3',
}))``;

const createPlaceholderCard = () => {
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

  const tempObj = useGetUserByIdQuery(HARDCODED_USER_ID);
  const userData = tempObj.data;
  const userIsLoading = tempObj.isLoading;
  const userError = tempObj.error;

  if (isLoading || userIsLoading) {
    return (
      <CardContainerRow>
        {createPlaceholderCard()}
        {createPlaceholderCard()}
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
  const showRequestTypes = userData!.settings.prayer.filters.showRequests;
  const showPraiseTypes = userData!.settings.prayer.filters.showPraise;
  const showConfessionTypes = userData!.settings.prayer.filters.showConfessions;

  const rawItems = data!.filter((item) => {
    const completenessCheck: boolean = showAll || !item.completed;
    const filterCheck: boolean =
      showAllTypes ||
      (showRequestTypes && item.type === PrayerTypes.request) ||
      (showPraiseTypes && item.type === PrayerTypes.praise) ||
      (showConfessionTypes && item.type === PrayerTypes.confession);

    return completenessCheck && filterCheck;
  });

  const sortOption = userData!.settings.prayer.sort;
  rawItems.sort((a, b) => {
    if (a.date < b.date) {
      if (sortOption === 'date-asc') {
        return -1;
      } else {
        return 1;
      }
    }
    if (a.date > b.date) {
      if (sortOption === 'date-asc') {
        return 1;
      } else {
        return -1;
      }
    }

    return 0;
  });

  const items = rawItems.map((item) => {
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

    let icon;
    if (item.type === PrayerTypes.praise) {
      icon = <ShieldPlus className="float-end text-primary" />;
    } else if (item.type === PrayerTypes.request) {
      icon = <Tsunami className="float-end text-primary" />;
    } else if (item.type === PrayerTypes.confession) {
      icon = <EyeFill className="float-end text-primary" />;
    }

    return (
      <Col key={item.id} className="mt-2">
        <Card className="h-100 shadow">
          <Card.Body className="d-flex flex-column">
            <Card.Title>
              {item.title} {icon ? icon : ''}
            </Card.Title>
            <MaxHeightText>{item.text}</MaxHeightText>
            {submitButton}
            <Card.Footer>{item.date}</Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return <CardContainerRow>{items}</CardContainerRow>;
}
