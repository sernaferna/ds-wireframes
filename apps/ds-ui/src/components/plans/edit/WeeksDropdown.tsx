import React from 'react';
import { Dropdown } from 'react-bootstrap';

interface IWeeksDropdown {
  numWeeks: number;
  updateWeeksCallback(newValue: number): void;
}
export const WeeksDropdown = ({ numWeeks, updateWeeksCallback }: IWeeksDropdown) => {
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
