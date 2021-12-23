import React from 'react';
import { CardContainerRow } from '../styled-components/StyledComponents';
import { useGetCurrentItemsQuery } from '../../services/PassagesService';
import { ErrorLoadingDataMessage } from '../common/loading';
import { PlaceholderCard, PassageCard } from './PassageCard';

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

  return <CardContainerRow>{items}</CardContainerRow>;
};
