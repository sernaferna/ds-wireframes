import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useGetNoteByIdQuery } from '../../../services/VapiService';
import { updateSelectedPassage } from '../../../stores/UISlice';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { DownloadedNoteDetails, FetchFunction } from '../ReadPage';
import { MarkdownPreview } from '../../common/md-helpers/MarkdownPreview';

interface INotesSnippet {
  noteID: string;
  downloadedNoteDetails: DownloadedNoteDetails;
  fetchNote: FetchFunction;
}

/**
 * Displays a preview of a note, leveraging the `MarkdownPreview`
 * component for rendering.
 *
 * Leverages the `downloadedNoteDetails` object to render differently
 * if the user has selected the same note in the UI.
 *
 * @param noteID ID of the note to be displayed
 * @param downloadedNoteDetails Details about the currently selected Note in the UI (if any)
 * @param fetchNote Callback function for fetching a note (called when the item is selected by the user)
 */
export const NotesSnippet = ({ noteID, downloadedNoteDetails, fetchNote }: INotesSnippet) => {
  const { data, error, isLoading } = useGetNoteByIdQuery(noteID);
  const dispatch = useDispatch();

  const userSelectedID = useMemo(() => {
    if (downloadedNoteDetails.isDownloaded) {
      return downloadedNoteDetails.note!.id;
    } else {
      return '';
    }
  }, [downloadedNoteDetails]);

  const selectNote = useCallback(() => {
    return () => {
      if (noteID !== userSelectedID) {
        fetchNote(noteID);
        dispatch(updateSelectedPassage(''));
      }
    };
  }, [fetchNote, dispatch, noteID, userSelectedID]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const textToDisplay = noteID === userSelectedID ? '[Editing] ' + data!.text : data!.text;
  const noteSnippet = textToDisplay.length > 99 ? textToDisplay.substring(0, 99) + '...' : textToDisplay;

  let noteSnippetClass = 'my-4';
  if (noteID === userSelectedID) {
    noteSnippetClass += ' text-muted fst-italic';
  }
  const noteSnippetStyles = {
    cursor: noteID === userSelectedID ? 'auto' : 'pointer',
  };

  return (
    <div className={noteSnippetClass} style={noteSnippetStyles} onClick={selectNote()}>
      <MarkdownPreview content={noteSnippet} shaded={true} />
    </div>
  );
};
