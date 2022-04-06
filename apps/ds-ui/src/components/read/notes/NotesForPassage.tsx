import React, { useEffect, useMemo } from 'react';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { useLazyGetAllNotesForPassageQuery } from '../../../services/VapiService';
import { getNoteList } from './AllNotes';

interface INotesForPassage {
  osis: string;
}
export const NotesForPassage = ({ osis }: INotesForPassage) => {
  const [trigger, result] = useLazyGetAllNotesForPassageQuery();

  useEffect(() => {
    if (osis && osis.length > 0) {
      trigger(osis);
    }
  }, [osis, result, trigger]);

  const notesList = useMemo(() => getNoteList(result.data), [result.data]);

  if (result.isUninitialized || result.isLoading) {
    return <LoadingMessage />;
  }
  if (result.error) {
    return <ErrorLoadingDataMessage theError={result.error} />;
  }

  return (
    <div className="notelist-for-passage">
      {notesList.length > 0 ? <h1>Notes for passage:</h1> : <p>No notes for selected passage.</p>}

      {notesList}
    </div>
  );
};
