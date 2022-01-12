import React from 'react';
import { useGetNoteByIdQuery } from '../../../services/VapiService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import MDEditor from '@uiw/react-md-editor';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedNote, getSelectedNote } from '../../../stores/UISlice';

interface NotesSnippetInterface {
  noteID: string;
}
export const NotesSnippet = ({ noteID }: NotesSnippetInterface) => {
  const selectedNote = useSelector(getSelectedNote);
  const { data, error, isLoading } = useGetNoteByIdQuery(noteID);
  const dispatch = useDispatch();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const textToDisplay = noteID === selectedNote ? '[Editing] ' + data!.text : data!.text;
  const noteSnippet = textToDisplay.length > 99 ? textToDisplay.substring(0, 99) + '...' : textToDisplay;

  const selectNote = () => {
    if (noteID !== selectedNote) {
      dispatch(updateSelectedNote(noteID));
    }
  };

  return (
    <div
      className={noteID === selectedNote ? 'note-snippet-selected' : 'note-snippet'}
      onClick={() => {
        selectNote();
      }}
    >
      <MDEditor.Markdown source={noteSnippet} />
    </div>
  );
};
