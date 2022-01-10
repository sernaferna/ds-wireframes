import React, { useEffect } from 'react';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { useLazyGetAllNotesForPassageQuery } from '../../../services/VapiService';
import { NotesSnippet } from './NotesSnippet';

interface NotesForPassageInterface {
  osis: string;
}
export const NotesForPassage = ({ osis }: NotesForPassageInterface) => {
  const [trigger, result] = useLazyGetAllNotesForPassageQuery();

  useEffect(() => {
    if (osis && osis.length > 0) {
      trigger(osis);
    }
  }, [osis, result, trigger]);

  if (result.isUninitialized || result.isLoading) {
    return <LoadingMessage />;
  }
  if (result.error) {
    return <ErrorLoadingDataMessage />;
  }

  const notesList = result.data!.map((item) => <NotesSnippet key={item.id} noteID={item.id} />);

  return (
    <>
      {notesList.length > 0 ? <h1>Notes for passage:</h1> : <p>No notes for selected passage.</p>}

      {notesList}
    </>
  );
};
