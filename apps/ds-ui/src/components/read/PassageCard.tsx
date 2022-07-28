import React, { SyntheticEvent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Placeholder, Col, CloseButton } from 'react-bootstrap';
import { getFormattedReference } from '@devouringscripture/common';
import { useDeletePassageItemMutation, useGetPassageByIdQuery } from '../../services/PassagesService';
import { getSelectedPassage, updateSelectedPassage, updateSelectedNote } from '../../stores/UISlice';
import { PassageLinkBody } from './PassageLinkBody';
import { ErrorLoadingDataMessage, LoadingMessage } from '../common/loading';

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
  passageID: string;
}

/**
 * Displays a card for a particular passage. Renders appropriately
 * if the passage has been selected by the user or not. The `fetchNote`
 * and `fetchPassage` callbacks are just used for when the user selects
 * or unselects the passage.
 *
 * @param passageID The passage to be rendered
 */
const PassageCard = ({ passageID }: IPassageCard) => {
  const selectedPassageID = useSelector(getSelectedPassage);
  const { data, error, isLoading } = useGetPassageByIdQuery(passageID);
  const dispatch = useDispatch();
  const [deleteItem] = useDeletePassageItemMutation();

  const removeItem = useCallback(
    (e: SyntheticEvent) => {
      dispatch(updateSelectedPassage(''));
      deleteItem(data!.id);
      e.stopPropagation();
    },
    [deleteItem, data, dispatch]
  );

  const titleClicked = (id: string) => {
    if (selectedPassageID === id) {
      dispatch(updateSelectedPassage(''));
      dispatch(updateSelectedNote(''));
    } else {
      dispatch(updateSelectedPassage(id));
      dispatch(updateSelectedNote(''));
    }
  };

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  return (
    <Col className="mt-2">
      <Card
        bg={selectedPassageID === data!.id ? 'primary' : ''}
        className={`h-100 shadow reading-text ${selectedPassageID === data!.id ? 'text-white' : ''}`}
      >
        <Card.Body className="d-flex flex-column">
          <Card.Title style={{ cursor: 'pointer' }} onClick={() => titleClicked(data!.id)}>
            {getFormattedReference(data!.osis)}
            <CloseButton
              variant={selectedPassageID === data!.id ? 'white' : undefined}
              className="float-end"
              onClick={removeItem}
            />
          </Card.Title>
          <Card.Text as="div">
            <PassageLinkBody passage={data!} selected={selectedPassageID === data!.id ? true : false} />
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
