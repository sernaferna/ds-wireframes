import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

interface WeeksDDProps {
  numWeeks: number;
  updateWeeksCallback(newValue: number): void;
}
export const WeeksDropdown = ({ numWeeks, updateWeeksCallback }: WeeksDDProps) => {
  const displayString = `${numWeeks} weeks`;

  return (
    <Dropdown.Item
      eventKey={numWeeks}
      onClick={() => {
        updateWeeksCallback(numWeeks);
      }}
    >
      {displayString}
    </Dropdown.Item>
  );
};
