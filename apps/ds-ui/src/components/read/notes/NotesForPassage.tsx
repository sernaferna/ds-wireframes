import React, { useEffect, useMemo } from 'react';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { useLazyGetAllNotesForPassageQuery } from '../../../services/VapiService';
import { getNoteList } from './AllNotes';
import { DownloadedNoteDetails, FetchFunction } from '../ReadPage';

interface INotesForPassage {
  osis: string;
  noteDetails: DownloadedNoteDetails;
  fetchNote: FetchFunction;
  fetchPassage: FetchFunction;
}
export const NotesForPassage = ({ osis, noteDetails, fetchNote, fetchPassage }: INotesForPassage) => {
  const [trigger, result] = useLazyGetAllNotesForPassageQuery();

  useEffect(() => {
    if (osis && osis.length > 0) {
      trigger(osis);
    }
  }, [osis, trigger]);

  const notesList = useMemo(
    () => getNoteList(result.data, noteDetails, fetchNote, fetchPassage),
    [result.data, noteDetails, fetchNote, fetchPassage]
  );

  if (result.isUninitialized || result.isLoading) {
    return <LoadingMessage />;
  }
  if (result.error) {
    return <ErrorLoadingDataMessage theError={result.error} />;
  }

  return (
    <div className="w-100">
      {notesList.length > 0 ? (
        <>
          <h6>Notes for Selected Passage</h6>
          <p className="text-muted">The following notes are associated with the selected passage:</p>
        </>
      ) : (
        <p>No notes for selected passage.</p>
      )}

      {notesList}
    </div>
  );
};
