import React from 'react';
import { Dropdown } from 'react-bootstrap';

interface IWeeksDropdown {
  numWeeks: number;
  updateWeeksCallback(newValue: number): void;
}

/**
 * Renders a dropdown item for the "num weeks" dropdown.
 *
 * @param numWeeks The number to be shown in this item
 * @param updateWeeksCallback Callback to be called if this item is chosen
 */
export const WeeksDropdownItem = ({ numWeeks, updateWeeksCallback }: IWeeksDropdown) => {
  const displayString = `${numWeeks} weeks`;

  const handleClick = (numWeeks: number) => {
    return () => {
      updateWeeksCallback(numWeeks);
    };
  };

  return (
    <Dropdown.Item eventKey={numWeeks} onClick={handleClick(numWeeks)}>
      {displayString}
    </Dropdown.Item>
  );
};
