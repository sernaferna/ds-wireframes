import React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedReadingItem } from '../../stores/UISlice';
import { MDNoteTaker } from './MDNoteTaker';
import { NotesForPassage } from './NotesForPassage';
import { useGetPassageByIdQuery } from '../../services/PassagesService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';

export const PassageNotes = () => {
  const selectedReadingItem = useSelector(getSelectedReadingItem);
  const { data, error, isLoading } = useGetPassageByIdQuery(selectedReadingItem);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  if (selectedReadingItem === '' || null || undefined) {
    return <p>Please select a passage to take notes.</p>;
  }

  return (
    <>
      <h1>Passage Notes</h1>
      <MDNoteTaker />
      <NotesForPassage osis={data!.reference} />
    </>
  );
};
