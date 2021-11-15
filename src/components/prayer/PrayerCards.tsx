import React from 'react';
import { PrayerListItem } from '../../datamodel/PrayerListItem';
import { ToastManager, ToastType, TOAST_FADE_TIME } from '../common/toasts/ToastManager';
import { PrayerListAPI } from '../../mocks/apis/PrayerListAPI';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';

const MaxHeightText = styled(Card.Text).attrs(() => ({
  className: 'overflow-auto',
}))`
  max-height: 8em;
`;

interface PrayerCardsProps {
  items: PrayerListItem[];
}

export class PrayerCards extends React.Component<PrayerCardsProps> {
  private toastManager: ToastManager | null = null;

  private getToastManager() {
    if (this.toastManager === null) {
      const toastContainerDiv = document.getElementById('main-toast-container') as HTMLDivElement;
      this.toastManager = new ToastManager(toastContainerDiv);
    }

    return this.toastManager;
  }

  private handleCompleteButton(id: string, complete: boolean) {
    try {
      PrayerListAPI.markCompleted(id, complete);
      const message = complete ? 'Successfully marked complete' : 'Successfully marked incomplete';
      this.getToastManager().show({
        title: 'Success!',
        content: message,
        duration: TOAST_FADE_TIME,
        type: ToastType.Success,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const items = this.props.items.map((item) => {
      const submitButton = item.completed ? (
        <Button
          variant="secondary"
          onClick={() => {
            this.handleCompleteButton(item.id, true);
          }}
        >
          Mark Incomplete
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={() => {
            this.handleCompleteButton(item.id, false);
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
              <Card.Subtitle>{item.date.toLocaleDateString()}</Card.Subtitle>
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
}
