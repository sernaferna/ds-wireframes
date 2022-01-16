import React, { useState } from 'react';
import { useGetCurrentItemsQuery } from '../../services/PassagesService';
import { ErrorLoadingDataMessage } from '../common/loading';
import { PlaceholderCard, PassageCard } from './PassageCard';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { paginateItems } from '../../helpers/pagination';

const CardContainerRow = styled(Row).attrs(() => ({
  xs: '1',
  xxl: '2',
}))``;

export const PassageCards = () => {
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
    return <ErrorLoadingDataMessage />;
  }

  const items = data!.map((item) => {
    return <PassageCard key={item.id} passage={item} />;
  });

  const [paginatedItems, paginateElement] = paginateItems(items, 6, currentPage, setCurrentPage);

  return (
    <CardContainerRow>
      {paginatedItems.length > 0 ? paginatedItems : <Alert variant="primary">No saved passages.</Alert>}
      {paginateElement}
    </CardContainerRow>
  );
};
