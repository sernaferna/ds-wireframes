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

/**
 * Displays a list of notes that match the start/end reference for the
 * selected passage. Leverages the `getNoteList()` function defined in
 * `ReadPage` for consistency in rendering the list.
 *
 * There are a number of interrelated pages to be aware of:
 *
 * * **ReadPage** includes **PassageNotes**
 * * PassageNotes displays **MDNoteTaker** and *NotesForPassage*
 *
 * @param osis The OSIS string for the currently selected passage
 * @param noteDetails Details for the currently downloaded/downloading note (for properly rendering the note that's currently selected, if any)
 * @param fetchNote Callback for getting a note from the server by ID
 * @param fetchPassage Callback for getting a passage from the server by ID
 */
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
