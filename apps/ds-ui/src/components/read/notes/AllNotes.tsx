import React, { useState } from 'react';
import { useGetAllNotesQuery } from '../../../services/VapiService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { NotesSnippet } from './NotesSnippet';
import { paginateItems } from '../../../helpers/pagination';

export const AllNotes = () => {
  const { data, error, isLoading } = useGetAllNotesQuery();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const noteList = data!.map((item) => <NotesSnippet key={item.id} noteID={item.id} />);
  const [paginatedNoteList, paginateElement] = paginateItems(noteList, 5, currentPage, setCurrentPage);

  return (
    <div className="notelist-for-all">
      <h1>All Notes</h1>

      {paginatedNoteList}

      {paginateElement}
    </div>
  );
};
