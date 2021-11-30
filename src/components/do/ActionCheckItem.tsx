import React from 'react';
import { ActionEntry } from '../../datamodel/Action';
import { Check2Circle, Circle } from 'react-bootstrap-icons';
import Stack from 'react-bootstrap/Stack';
import styled from 'styled-components';

const StyledStack = styled(Stack).attrs(() => ({
  direction: 'horizontal',
  gap: 1,
}))`
  cursor: pointer;
`;

interface ActionCheckItemInterface {
  item: ActionEntry;
  clickFunction(id: string): void;
}

export function ActionCheckItem(data: ActionCheckItemInterface) {
  const icon = data.item.completed ? <Check2Circle className="text-success" /> : <Circle className="text-secondary" />;
  return (
    <StyledStack
      key={data.item.id}
      onClick={() => {
        data.clickFunction(data.item.id);
      }}
    >
      {icon}
      <div>{data.item.displayName}</div>
    </StyledStack>
  );
}
