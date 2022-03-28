import React, { useMemo } from 'react';
import { ActionEntry } from '@devouringscripture/common';
import { Check2Circle, Circle } from 'react-bootstrap-icons';
import Stack from 'react-bootstrap/Stack';

interface ActionCheckItemInterface {
  item: ActionEntry;
  clickFunction(id: string): void;
}
export function ActionCheckItem({ item, clickFunction }: ActionCheckItemInterface) {
  const icon = useMemo(
    () => (item.completed ? <Check2Circle className="text-success" /> : <Circle className="text-secondary" />),
    [item.completed]
  );

  const handleClick = (id: string) => {
    return () => {
      clickFunction(id);
    };
  };

  return (
    <Stack direction="horizontal" gap={1} className="action-item-stack" key={item.id} onClick={handleClick(item.id)}>
      {icon}
      <div>{item.displayName}</div>
    </Stack>
  );
}
