import React from 'react';
import { useGetCurrentItemsQuery } from '../../services/PassagesService';
import { ErrorLoadingDataMessage } from '../common/loading';
import { PlaceholderCard, PassageCard } from './PassageCard';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

const CardContainerRow = styled(Row).attrs(() => ({
  xs: '1',
  xxl: '2',
}))``;

export const PassageCards = () => {
  const { data, error, isLoading } = useGetCurrentItemsQuery();

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

  return (
    <CardContainerRow>
      {items.length > 0 ? items : <Alert variant="primary">No saved passages.</Alert>}
    </CardContainerRow>
  );
};
