import React from 'react';
import { TrashFill } from 'react-bootstrap-icons';

interface IPrayerIconsContainer {
  itemId: string;
  deleteItem(id: string): void;
  children: JSX.Element;
}
export const PrayerIconsContainer = ({ itemId, deleteItem, children }: IPrayerIconsContainer) => {
  const handleClick = (id: string) => {
    return () => {
      deleteItem(id);
    };
  };

  return (
    <div className="icons-container">
      {children}
      <TrashFill className="delete-icon" onClick={handleClick(itemId)} />
    </div>
  );
};
