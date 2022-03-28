import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

interface WeeksDDProps {
  numWeeks: number;
  updateWeeksCallback(newValue: number): void;
}
export const WeeksDropdown = ({ numWeeks, updateWeeksCallback }: WeeksDDProps) => {
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
