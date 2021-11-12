import React from 'react';
import { PrayerListItem } from '../../datamodel/PrayerListItem';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import { PrayerListAPI } from '../../mocks/apis/PrayerListAPI';

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
  public static defaultProps = {
    fullList: false,
  };

  constructor(props: PrayerListProperties) {
    super(props);

    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    const items: PrayerListItem[] = PrayerListAPI.getPrayerItems();

    this.setState({ items });
  }

  private handleCompleteButton(id: string, complete: boolean) {
    try {
      PrayerListAPI.markCompleted(id, complete);
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
          <Col>
            <Card className="h-100">
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
