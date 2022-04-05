import React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedReadingItem, getSelectedNote } from '../../../stores/UISlice';
import { MDNoteTaker } from './MDNoteTaker';
import { NotesForPassage } from './NotesForPassage';
import { useGetPassageByIdQuery } from '../../../services/PassagesService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import Alert from 'react-bootstrap/Alert';

export const PassageNotes = () => {
  const selectedReadingItem = useSelector(getSelectedReadingItem);
  const selectedNote = useSelector(getSelectedNote);
  const { data, error, isLoading } = useGetPassageByIdQuery(selectedReadingItem);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  if (!selectedReadingItem && !selectedNote) {
    return <Alert variant="primary">Please select a passage or noteto take notes.</Alert>;
  }

  return (
    <>
      <h4>Notes</h4>
      <MDNoteTaker />

      {selectedReadingItem ? <NotesForPassage osis={data!.osis} /> : <></>}
    </>
  );
};
