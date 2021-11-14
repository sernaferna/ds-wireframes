import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { PrayerListItem } from '../../datamodel/PrayerListItem';
import styled from 'styled-components';

const ItemText = styled.p`
  height: 1.1em;
`;

interface PrayerSnapshotProperties {
  items: PrayerListItem[];
}

export class PrayerSnapshot extends React.Component<PrayerSnapshotProperties> {
  render() {
    const items = this.props.items.map((item) => {
      const itemBody = (
        <ItemText className="overflow-hidden">
          <strong className="me-1">{item.title}</strong>
          {item.text}
        </ItemText>
      );
      return <Form.Check type="checkbox" id={item.id} label={itemBody} />;
    });

    return (
      <Card className="m-0">
        <Card.Body>{items}</Card.Body>
      </Card>
    );
  }
}
