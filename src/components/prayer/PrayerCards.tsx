import React from 'react';
import { ToastType, TOAST_FADE_TIME, getToastManager } from '../common/toasts/ToastManager';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import styled from 'styled-components';
import { useGetAllItemsQuery, useMarkReadMutation, useMarkUnreadMutation } from '../../services/PrayerService';

const MaxHeightText = styled(Card.Text).attrs(() => ({
  className: 'overflow-auto',
}))`
  max-height: 8em;
`;

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

  if (isLoading) {
    return (
      <Row xs="1" md="2" lg="3" xxl="4">
        {createPlaceholderCard()}
        {createPlaceholderCard()}
      </Row>
    );
  }

  if (error) {
    return <div>Error!</div>;
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

  const items = data!.map((item) => {
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
    const footerText = item.completed ? 'Completed' : 'Incomplete';

    return (
      <Col key={item.id} className="mt-2">
        <Card className="h-100 shadow">
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Subtitle>{item.date}</Card.Subtitle>
            <MaxHeightText>{item.text}</MaxHeightText>
            {submitButton}
            <Card.Footer>{footerText}</Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <Row xs="1" md="2" lg="3" xxl="4">
      {items}
    </Row>
  );
}
