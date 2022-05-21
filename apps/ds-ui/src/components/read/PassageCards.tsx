import React, { useState } from 'react';
import { useGetCurrentItemsQuery } from '../../services/PassagesService';
import { ErrorLoadingDataMessage } from '../common/loading';
import { PlaceholderCard, PassageCard } from './PassageCard';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { paginateItems } from '../../helpers/pagination';
import { DownloadedPassageDetails, FetchFunction } from './ReadPage';

interface IPassageCards {
  passageDetails: DownloadedPassageDetails;
  fetchNote: FetchFunction;
  fetchPassage: FetchFunction;
}
export const PassageCards = ({ passageDetails, fetchNote, fetchPassage }: IPassageCards) => {
  const { data, error, isLoading } = useGetCurrentItemsQuery();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <Row xs="1" xxl="2">
        <PlaceholderCard />
        <PlaceholderCard />
      </Row>
    );
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const items = data!.map((item) => {
    return (
      <PassageCard
        downloadedPassageDetails={passageDetails}
        key={item.id}
        passage={item}
        fetchNote={fetchNote}
        fetchPassage={fetchPassage}
      />
    );
  });

  const [paginatedItems, paginateElement] = paginateItems(items, 6, currentPage, setCurrentPage);

  return (
    <Row xs="1" xxl="2">
      {paginatedItems.length > 0 ? paginatedItems : <Alert variant="primary">No saved passages.</Alert>}
      {paginateElement}
    </Row>
  );
};
