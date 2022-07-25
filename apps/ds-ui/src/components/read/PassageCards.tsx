import React, { useState } from 'react';
import { useGetCurrentItemsQuery, sortPassageItems } from '../../services/PassagesService';
import { ErrorLoadingDataMessage } from '../common/loading';
import { PassageCard } from './PassageCard';
import { Row, Alert } from 'react-bootstrap';
import { paginateItems } from '../../hooks/pagination';
import { DownloadedPassageDetails, FetchFunction } from './ReadPage';

interface IPassageCards {
  passageDetails: DownloadedPassageDetails;
  fetchNote: FetchFunction;
  fetchPassage: FetchFunction;
  sortOrder: string;
}

/**
 * Displays all saved passages, via `PassageCard` components.
 *
 * @param passageDetails Details about current passage (pass-through)
 * @param fetchNote Callback to fetch a note (pass-through)
 * @param fetchPassage Callback to fetch a passage (pass-through)
 * @param sortOrder Indicates how the passages should be sorted
 */
export const PassageCards = ({ passageDetails, fetchNote, fetchPassage, sortOrder }: IPassageCards) => {
  const { data, error, isLoading } = useGetCurrentItemsQuery();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <Row xs="1" xxl="2">
        <PassageCard.Placeholder />
        <PassageCard.Placeholder />
      </Row>
    );
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const sortAsc = sortOrder === 'date-asc' ? true : false;
  const sortedItems = sortPassageItems(data!.slice(), sortAsc);

  const items = sortedItems.map((item) => {
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
    <>
      <h4>Saved Passages</h4>
      <Row xs="1" sm="2" xxl="2">
        {paginatedItems.length > 0 ? paginatedItems : <Alert variant="primary">No saved passages.</Alert>}
        {paginateElement}
      </Row>
    </>
  );
};
