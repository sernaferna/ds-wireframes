import React, { useMemo } from 'react';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { useGetAllNotesForPassageQuery } from '../../../services/VapiService';
import { getNoteList } from './AllNotes';

interface INotesForPassage {
  osis: string;
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
 */
export const NotesForPassage = ({ osis }: INotesForPassage) => {
  const { data, error, isLoading } = useGetAllNotesForPassageQuery(osis, { skip: osis.length > 0 ? false : true });

  const notesList = useMemo(() => getNoteList(data), [data]);

  if (osis.length > 0 && isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
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
