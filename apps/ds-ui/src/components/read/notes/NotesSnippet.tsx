import React, { useCallback } from 'react';
import { useGetNoteByIdQuery } from '../../../services/VapiService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import MDEditor from '@uiw/react-md-editor';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedNote, getSelectedNote } from '../../../stores/UISlice';

interface INotesSnippet {
  noteID: string;
}
export const NotesSnippet = ({ noteID }: INotesSnippet) => {
  const selectedNote = useSelector(getSelectedNote);
  const { data, error, isLoading } = useGetNoteByIdQuery(noteID);
  const dispatch = useDispatch();

  const selectNote = useCallback(() => {
    return () => {
      if (noteID !== selectedNote) {
        dispatch(updateSelectedNote(noteID));
      }
    };
  }, [dispatch, selectedNote, noteID]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const textToDisplay = noteID === selectedNote ? '[Editing] ' + data!.text : data!.text;
  const noteSnippet = textToDisplay.length > 99 ? textToDisplay.substring(0, 99) + '...' : textToDisplay;

  return (
    <div className={noteID === selectedNote ? 'note-snippet-selected' : 'note-snippet'} onClick={selectNote()}>
      <MDEditor.Markdown source={noteSnippet} />
    </div>
  );
};
