import React, { SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { Passage } from '@devouringscripture/common';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import { useDeletePassageItemMutation } from '../../services/PassagesService';
import { updateSelectedReadingItem, getSelectedReadingItem, updateSelectedNote } from '../../stores/UISlice';
import { PassageLinkBody } from './PassageLinkBody';
import { getFormattedPassageRef } from '@devouringscripture/refparse';

export const PlaceholderCard = () => {
  return (
    <Col className="mt-2">
      <Card className="h-100 shadow reading-text">
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
export const PassageCard = ({ passage }: PrayerCardInterface) => {
  const selectedPrayerID = useSelector(getSelectedReadingItem);
  const dispatch = useDispatch();
  const [deleteItem] = useDeletePassageItemMutation();

  const removeItem = (e: SyntheticEvent) => {
    dispatch(updateSelectedReadingItem(''));
    deleteItem(passage.id);
    e.stopPropagation();
  };

  const titleClicked = (id: string) => {
    if (selectedPrayerID === id) {
      dispatch(updateSelectedReadingItem(''));
      dispatch(updateSelectedNote(''));
    } else {
      dispatch(updateSelectedReadingItem(id));
      dispatch(updateSelectedNote(''));
    }
  };

  const bibleVersionLogo =
    passage.version === 'NIV' ? (
      <img src="logos/niv_179x50.png" alt="NIV Logo" height={'25px'} />
    ) : (
      <img src="logos/esv_95x50.png" alt="NIV Logo" height={'25px'} />
    );

  return (
    <Col className="mt-2">
      <Card
        bg={selectedPrayerID === passage.id ? 'primary' : ''}
        className={`h-100 shadow reading-text ${selectedPrayerID === passage.id ? 'text-white' : ''}`}
      >
        <Card.Body className="d-flex flex-column">
          <Card.Title onClick={() => titleClicked(passage.id)}>
            {getFormattedPassageRef(passage.reference)}
            <CloseButton className="float-end" onClick={removeItem} />
          </Card.Title>
          <Card.Text as="div">
            <PassageLinkBody passage={passage} selected={selectedPrayerID === passage.id ? true : false} />
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex d-md-none flex-row-reverse">
          <img className="ms-3" src="logos/BibleGateway_263x50.png" height="25px" alt="Bible Gateway Logo" />
          {bibleVersionLogo}
        </Card.Footer>
      </Card>
    </Col>
  );
};
