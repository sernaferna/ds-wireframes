import React from 'react';
import { useGetNoteByIdQuery } from '../../../services/VapiService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import MDEditor from '@uiw/react-md-editor';
import { useDispatch } from 'react-redux';
import { updateSelectedNote } from '../../../stores/UISlice';

interface NotesSnippetInterface {
  noteID: string;
}
export const NotesSnippet = ({ noteID }: NotesSnippetInterface) => {
  const { data, error, isLoading } = useGetNoteByIdQuery(noteID);
  const dispatch = useDispatch();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const noteSnippet = data!.text.length > 99 ? data!.text.substring(0, 99) + '...' : data!.text;

  const selectNote = () => {
    console.log(`selectNote for ${noteID}`);
    dispatch(updateSelectedNote(noteID));
  };

  return (
    <div
      className="p-2 bg-light my-2 border border-2"
      onClick={() => {
        selectNote();
      }}
    >
      <MDEditor.Markdown source={noteSnippet} />
    </div>
  );
};
