import React, { useState } from 'react';
import { useGetCurrentItemsQuery } from '../../services/PassagesService';
import { ErrorLoadingDataMessage } from '../common/loading';
import { PlaceholderCard, PassageCard } from './PassageCard';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { paginateItems } from '../../helpers/pagination';
import { DownloadedPassageDetails, FetchFunction } from './ReadPage';

const CardContainerRow = styled(Row).attrs(() => ({
  xs: '1',
  xxl: '2',
}))``;

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
      <CardContainerRow>
        <PlaceholderCard />
        <PlaceholderCard />
      </CardContainerRow>
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
    <CardContainerRow>
      {paginatedItems.length > 0 ? paginatedItems : <Alert variant="primary">No saved passages.</Alert>}
      {paginateElement}
    </CardContainerRow>
  );
};
