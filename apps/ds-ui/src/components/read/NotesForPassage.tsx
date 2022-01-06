import React from 'react';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { useGetAllNotesForPassageQuery } from '../../services/VapiService';
import { NotesSnippet } from './NotesSnippet';

interface NotesForPassageInterface {
  osis: string;
}
export const NotesForPassage = (props: NotesForPassageInterface) => {
  const { data, error, isLoading } = useGetAllNotesForPassageQuery(props.osis);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const notesList = data!.map((item) => <NotesSnippet key={item.id} noteID={item.id} />);

  return (
    <>
      <h1>Notes for passage:</h1>
      {notesList}
    </>
  );
};
