import React, { SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { Passage } from '@devouringscripture/common';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import { useDeletePassageItemMutation } from '../../services/PassagesService';
import { updateSelectedReadingItem, getSelectedReadingItem } from '../../stores/UISlice';
import { PassageLinkBody } from './PassageLinkBody';
import { getRefForOSIS } from '@devouringscripture/refparse';

export const PlaceholderCard = () => {
  return (
    <Col className="mt-2">
      <Card className="h-100 shadow">
        <Card.Body>
          <Placeholder as={Card.Title} animation="wave">
            <Placeholder xs="12" />
          </Placeholder>
          <Placeholder as={Card.Text} animation="wave">
            <Placeholder xs="12" />
            <Placeholder xs="12" />
          </Placeholder>
        </Card.Body>
      </Card>
    </Col>
  );
};

interface PrayerCardInterface {
  passage: Passage;
}
export const PassageCard = (props: PrayerCardInterface) => {
  const selectedPrayerID = useSelector(getSelectedReadingItem);
  const dispatch = useDispatch();
  const [deleteItem] = useDeletePassageItemMutation();

  const removeItem = (e: SyntheticEvent) => {
    console.log('remove item');
    dispatch(updateSelectedReadingItem(''));
    deleteItem(props.passage.id);
    e.stopPropagation();
  };

  const titleClicked = (id: string) => {
    console.log('title clicked');
    if (selectedPrayerID === id) {
      dispatch(updateSelectedReadingItem(''));
    } else {
      dispatch(updateSelectedReadingItem(id));
    }
  };

  return (
    <Col className="mt-2">
      <Card
        bg={selectedPrayerID === props.passage.id ? 'primary' : ''}
        className={`h-100 shadow ${selectedPrayerID === props.passage.id ? 'text-white' : ''}`}
      >
        <Card.Body className="d-flex flex-column">
          <Card.Title onClick={() => titleClicked(props.passage.id)}>
            {getRefForOSIS(props.passage.reference)}
            <CloseButton className="float-end" onClick={removeItem} />
          </Card.Title>
          <Card.Text as="div">
            <PassageLinkBody passage={props.passage} />
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
