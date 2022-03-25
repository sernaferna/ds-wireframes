import React from 'react';
import { TrashFill } from 'react-bootstrap-icons';

interface PrayerIconsContainerInterface {
  itemId: string;
  deleteItem(id: string): void;
  children: JSX.Element;
}
export const PrayerIconsContainer = ({ itemId, deleteItem, children }: PrayerIconsContainerInterface) => {
  return (
    <div className="icons-container">
      {children}
      <TrashFill
        className="delete-icon"
        onClick={() => {
          deleteItem(itemId);
        }}
      />
    </div>
  );
};
