import React, { SyntheticEvent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { Passage, getFormattedReference } from '@devouringscripture/common';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import { useDeletePassageItemMutation } from '../../services/PassagesService';
import { updateSelectedReadingItem, getSelectedReadingItem, updateSelectedNote } from '../../stores/UISlice';
import { PassageLinkBody } from './PassageLinkBody';

export const PlaceholderCard = () => {
  return (
    <Col className="passage-card">
      <Card className="card-body">
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
  const selectedItemID = useSelector(getSelectedReadingItem);
  const dispatch = useDispatch();
  const [deleteItem] = useDeletePassageItemMutation();

  const removeItem = useCallback(
    (e: SyntheticEvent) => {
      dispatch(updateSelectedReadingItem(''));
      deleteItem(passage.id);
      e.stopPropagation();
    },
    [dispatch, deleteItem, passage.id]
  );

  const titleClicked = useCallback(
    (id: string) => {
      if (selectedItemID === id) {
        dispatch(updateSelectedReadingItem(''));
        dispatch(updateSelectedNote(''));
      } else {
        dispatch(updateSelectedReadingItem(id));
        dispatch(updateSelectedNote(''));
      }
    },
    [selectedItemID, dispatch]
  );

  const bibleVersionLogo =
    passage.version === 'NIV' ? (
      <img src="logos/niv_179x50.png" alt="NIV Logo" height={'25px'} />
    ) : (
      <img src="logos/esv_95x50.png" alt="NIV Logo" height={'25px'} />
    );

  return (
    <Col className="mt-2">
      <Card
        bg={selectedItemID === passage.id ? 'primary' : ''}
        className={`passage-card ${selectedItemID === passage.id ? 'passage-card-selected' : ''}`}
      >
        <Card.Body className="card-body">
          <Card.Title onClick={() => titleClicked(passage.id)}>
            {getFormattedReference(passage.osis)}
            <CloseButton onClick={removeItem} />
          </Card.Title>
          <Card.Text as="div">
            <PassageLinkBody passage={passage} selected={selectedItemID === passage.id ? true : false} />
          </Card.Text>
        </Card.Body>
        <Card.Footer className="card-footer">
          <img src="logos/BibleGateway_263x50.png" height="25px" alt="Bible Gateway Logo" />
          {bibleVersionLogo}
        </Card.Footer>
      </Card>
    </Col>
  );
};
