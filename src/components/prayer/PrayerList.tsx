import React from 'react';
import { PrayerListItem } from '../../datamodel/PrayerListItem';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import { PrayerListAPI } from '../../mocks/apis/PrayerListAPI';
import { ToastManager, ToastType } from '../common/toasts/ToastManager';

const MaxHeightText = styled(Card.Text)`
  max-height: 8em;
`;

interface PrayerListState {
  items: PrayerListItem[];
}

interface PrayerListProperties {
  fullList: boolean;
}

export class PrayerList extends React.Component<PrayerListProperties, PrayerListState> {
  private toastManager: ToastManager | null = null;

  public static defaultProps = {
    fullList: false,
  };

  constructor(props: PrayerListProperties) {
    super(props);

    this.state = {
      items: [],
    };
  }

  private getToastManager() {
    if (this.toastManager === null) {
      const toastContainerDiv = document.getElementById('main-toast-container') as HTMLDivElement;
      this.toastManager = new ToastManager(toastContainerDiv);
    }

    return this.toastManager;
  }

  async componentDidMount() {
    const items: PrayerListItem[] = PrayerListAPI.getPrayerItems();

    this.setState({ items });
  }

  private handleCompleteButton(id: string, complete: boolean) {
    try {
      PrayerListAPI.markCompleted(id, complete);
      const message = complete ? 'Successfully marked complete' : 'Successfully marked incomplete';
      this.getToastManager().show({
        title: 'Success!',
        content: message,
        duration: 5000,
        type: ToastType.Success,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const items = this.state.items
      .filter((item) => {
        return this.props.fullList || !item.completed;
      })
      .map((item) => {
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
                <MaxHeightText className="overflow-auto">{item.text}</MaxHeightText>
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
