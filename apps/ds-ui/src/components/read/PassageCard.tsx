import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import { Card, Placeholder, Col, CloseButton } from 'react-bootstrap';
import { Passage, getFormattedReference } from '@devouringscripture/common';
import { useDeletePassageItemMutation } from '../../services/PassagesService';
import { PassageLinkBody } from './PassageLinkBody';
import { DownloadedPassageDetails, FetchFunction } from './ReadPage';

const PlaceholderCard = () => {
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

interface IPassageCard {
  passage: Passage;
  downloadedPassageDetails: DownloadedPassageDetails;
  fetchNote: FetchFunction;
  fetchPassage: FetchFunction;
}

/**
 * Displays a card for a particular passage. Renders appropriately
 * if the passage has been selected by the user or not. The `fetchNote`
 * and `fetchPassage` callbacks are just used for when the user selects
 * or unselects the passage.
 *
 * @param passage Passage to be displayed
 * @param downloadedPassageDetails Details about the downloaded / selected passage
 * @param fetchNote Callback function to get a note by ID (only called with empty string to reset)
 * @param fetchPassage Callback function to get a passage by ID
 */
const PassageCard = ({ passage, downloadedPassageDetails, fetchNote, fetchPassage }: IPassageCard) => {
  const [deleteItem] = useDeletePassageItemMutation();

  const selectedItemID = useMemo(() => {
    if (downloadedPassageDetails.isDownloaded) {
      return downloadedPassageDetails.passage!.id;
    } else {
      return '';
    }
  }, [downloadedPassageDetails]);

  const removeItem = useCallback(
    (e: SyntheticEvent) => {
      fetchPassage('');
      deleteItem(passage.id);
      e.stopPropagation();
    },
    [deleteItem, passage.id, fetchPassage]
  );

  const titleClicked = (id: string) => {
    if (selectedItemID === id) {
      fetchPassage('');
      fetchNote('');
    } else {
      fetchPassage(id);
      fetchNote('');
    }
  };

  return (
    <Col className="mt-2">
      <Card
        bg={selectedItemID === passage.id ? 'primary' : ''}
        className={`h-100 shadow reading-text ${selectedItemID === passage.id ? 'text-white' : ''}`}
      >
        <Card.Body className="d-flex flex-column">
          <Card.Title style={{ cursor: 'pointer' }} onClick={() => titleClicked(passage.id)}>
            {getFormattedReference(passage.osis)}
            <CloseButton
              variant={selectedItemID === passage.id ? 'white' : undefined}
              className="float-end"
              onClick={removeItem}
            />
          </Card.Title>
          <Card.Text as="div">
            <PassageLinkBody passage={passage} selected={selectedItemID === passage.id ? true : false} />
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const PCInternal = Object.assign(PassageCard, {
  Placeholder: PlaceholderCard,
});

export { PCInternal as PassageCard };
