import React, { useCallback, useMemo } from 'react';
import { useGetNoteByIdQuery } from '../../../services/VapiService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import MDEditor from '@uiw/react-md-editor';
import { DownloadedNoteDetails, FetchFunction } from '../ReadPage';

interface INotesSnippet {
  noteID: string;
  downloadedNoteDetails: DownloadedNoteDetails;
  fetchNote: FetchFunction;
  fetchPassage: FetchFunction;
}
export const NotesSnippet = ({ noteID, downloadedNoteDetails, fetchNote, fetchPassage }: INotesSnippet) => {
  const { data, error, isLoading } = useGetNoteByIdQuery(noteID);

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
        fetchPassage('');
      }
    };
  }, [fetchNote, fetchPassage, noteID, userSelectedID]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const textToDisplay = noteID === userSelectedID ? '[Editing] ' + data!.text : data!.text;
  const noteSnippet = textToDisplay.length > 99 ? textToDisplay.substring(0, 99) + '...' : textToDisplay;

  return (
    <div className={noteID === userSelectedID ? 'note-snippet-selected' : 'note-snippet'} onClick={selectNote()}>
      <MDEditor.Markdown source={noteSnippet} />
    </div>
  );
};
