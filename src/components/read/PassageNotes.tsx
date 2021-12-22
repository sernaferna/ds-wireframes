import React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedReadingItem } from '../../stores/UISlice';

export const PassageNotes = () => {
  const selectedReadingItem = useSelector(getSelectedReadingItem);

  if (selectedReadingItem === '' || null || undefined) {
    return <p>Please select a passage to take notes.</p>;
  }

  return (
    <>
      <h1>Passage Notes</h1>
      <p>{selectedReadingItem}</p>
    </>
  );
};
