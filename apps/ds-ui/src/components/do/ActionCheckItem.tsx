import React, { useMemo } from 'react';
import { ActionEntry } from '@devouringscripture/common';
import { Check2Circle, Circle } from 'react-bootstrap-icons';
import Stack from 'react-bootstrap/Stack';

interface IActionCheckItem {
  item: ActionEntry;
  clickFunction(id: string): void;
}
export function ActionCheckItem({ item, clickFunction }: IActionCheckItem) {
  const icon = useMemo(
    () => (item.completed ? <Check2Circle className="done" /> : <Circle className="undone" />),
    [item.completed]
  );

  const handleClick = (id: string) => {
    return () => {
      clickFunction(id);
    };
  };

  return (
    <Stack direction="horizontal" className="action-item-stack" key={item.id} onClick={handleClick(item.id)}>
      {icon}
      <div>{item.displayName}</div>
    </Stack>
  );
}
