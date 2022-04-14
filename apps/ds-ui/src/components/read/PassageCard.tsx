import React, { SyntheticEvent, useCallback, useMemo } from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { Passage, getFormattedReference } from '@devouringscripture/common';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import { useDeletePassageItemMutation } from '../../services/PassagesService';
import { PassageLinkBody } from './PassageLinkBody';
import { DownloadedPassageDetails, FetchFunction } from './ReadPage';

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

interface IPassageCard {
  passage: Passage;
  downloadedPassageDetails: DownloadedPassageDetails;
  fetchNote: FetchFunction;
  fetchPassage: FetchFunction;
}
export const PassageCard = ({ passage, downloadedPassageDetails, fetchNote, fetchPassage }: IPassageCard) => {
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
