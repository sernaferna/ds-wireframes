import React, { useMemo } from 'react';
import { ActionEntry } from '@devouringscripture/common';
import { Check2Circle, Circle } from 'react-bootstrap-icons';
import { Stack } from 'react-bootstrap';

interface IActionCheckItem {
  item: ActionEntry;
  clickFunction(id: string): void;
}

/**
 * Shows a line item in the list of potential actions, with checked/
 * unchecked indicator.
 *
 * @param item ActionEntry item to be displayed
 * @param clickFunction Callback function to call when the user clicks the item
 */
export function ActionCheckItem({ item, clickFunction }: IActionCheckItem) {
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
    <Stack direction="horizontal" gap={1} className="btn p-0" key={item.id} onClick={handleClick(item.id)}>
      {icon}
      <div className="user-select-none text-start">{item.displayName}</div>
    </Stack>
  );
}
