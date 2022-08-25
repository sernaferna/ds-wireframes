import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetNoteByIdQuery } from '../../../services/VapiService';
import { updateSelectedPassage, getSelectedNote, updateSelectedNote } from '../../../stores/UISlice';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { MarkdownBox } from '../../common/markdown/MarkdownBox';

interface INotesSnippet {
  noteID: string;
}

/**
 * Displays a preview of a note, leveraging the `MarkdownPreview`
 * component for rendering.
 *
 * @param noteID ID of the note to be displayed
 */
export const NotesSnippet = ({ noteID }: INotesSnippet) => {
  const { data, error, isLoading } = useGetNoteByIdQuery(noteID);
  const selectedNoteID = useSelector(getSelectedNote);
  const dispatch = useDispatch();

  const selectNote = useCallback(() => {
    return () => {
      if (noteID !== selectedNoteID) {
        dispatch(updateSelectedNote(noteID));
        dispatch(updateSelectedPassage(''));
      }
    };
  }, [dispatch, noteID, selectedNoteID]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const textToDisplay = noteID === selectedNoteID ? '[Editing] ' + data!.text : data!.text;
  const noteSnippet = textToDisplay.length > 99 ? textToDisplay.substring(0, 99) + '...' : textToDisplay;

  let noteSnippetClass = 'my-4';
  if (noteID === selectedNoteID) {
    noteSnippetClass += ' text-muted fst-italic';
  }
  const noteSnippetStyles = {
    cursor: noteID === selectedNoteID ? 'auto' : 'pointer',
  };

  return (
    <div className={noteSnippetClass} style={noteSnippetStyles} onClick={selectNote()}>
      <MarkdownBox.Preview
        content={noteSnippet}
        shaded={true}
        defaultVersion={data!.version}
        passageContext={data!.osis}
      />
    </div>
  );
};
