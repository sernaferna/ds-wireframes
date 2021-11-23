import React from 'react';
import { ToastManager, ToastType, TOAST_FADE_TIME } from '../common/toasts/ToastManager';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectPrayerState, fetchAllPrayerItems, markComplete } from '../../stores/PrayerSlice';

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
  let toastManager: ToastManager | null = null;
  const prayerState = useSelector(selectPrayerState);
  const dispatch = useDispatch();

  if (!prayerState.loaded) {
    dispatch(fetchAllPrayerItems());
    return (
      <Row xs="1" md="2" lg="3" xxl="4">
        {createPlaceholderCard()}
        {createPlaceholderCard()}
      </Row>
    );
  }

  const getToastManager = () => {
    if (toastManager === null) {
      const toastContainerDiv = document.getElementById('main-toast-container') as HTMLDivElement;
      toastManager = new ToastManager(toastContainerDiv);
    }

    return toastManager;
  };

  const handleCompleteButton = (id: string, complete: boolean) => {
    try {
      dispatch(markComplete({ id, complete }));
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

  const items = prayerState.items.map((item) => {
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
      <Col key={item.title} className="mt-2">
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
