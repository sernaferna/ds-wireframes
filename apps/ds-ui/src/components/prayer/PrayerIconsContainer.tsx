import React from 'react';
import { TrashFill } from 'react-bootstrap-icons';

interface IPrayerIconsContainer {
  itemId: string;
  deleteItem(id: string): void;
  children: JSX.Element;
}

/**
 * Serves as a container for the icons that are shown in a prayer item.
 * The `PrayerCards` component renders each item as a card, which
 * contains this container, which, in turn, contains the prayer item's
 * icon (if any).
 *
 * This component also provides the delete button for the prayer item.
 *
 * @param itemId ID of the prayer item in the database (used for calling deleteItem)
 * @param deleteItem Callback for deleting a prayer item
 * @param children Any child items that should be rendered; typically just the icon
 */
export const PrayerIconsContainer = ({ itemId, deleteItem, children }: IPrayerIconsContainer) => {
  const handleClick = (id: string) => {
    return () => {
      deleteItem(id);
    };
  };

  return (
    <div className="float-end text-primary">
      {children}
      <span className="btn btn-lg p-0 ms-1">
        <TrashFill className="text-danger" onClick={handleClick(itemId)} />
      </span>
    </div>
  );
};
