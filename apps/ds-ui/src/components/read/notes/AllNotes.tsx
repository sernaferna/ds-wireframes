import React, { useState, useMemo } from 'react';
import { useGetAllNotesQuery } from '../../../services/VapiService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { NotesSnippet } from './NotesSnippet';
import { paginateItems } from '../../../helpers/pagination';
import { Note } from '@devouringscripture/common';
import { DownloadedNoteDetails, FetchFunction } from '../ReadPage';

export const getNoteList = (
  data: Note[] | undefined,
  downloadedNoteDetails: DownloadedNoteDetails,
  fetchNote: FetchFunction,
  fetchPassage: FetchFunction
) => {
  if (data === undefined) {
    return [];
  }

  return data.map((item) => (
    <NotesSnippet
      fetchNote={fetchNote}
      fetchPassage={fetchPassage}
      downloadedNoteDetails={downloadedNoteDetails}
      key={item.id}
      noteID={item.id}
    />
  ));
};

interface IAllNotes {
  noteDetails: DownloadedNoteDetails;
  fetchNote: FetchFunction;
  fetchPassage: FetchFunction;
}
export const AllNotes = ({ noteDetails, fetchNote, fetchPassage }: IAllNotes) => {
  const { data, error, isLoading } = useGetAllNotesQuery();
  const [currentPage, setCurrentPage] = useState(1);

  const noteList = useMemo(
    () => getNoteList(data, noteDetails, fetchNote, fetchPassage),
    [data, noteDetails, fetchNote, fetchPassage]
  );

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const [paginatedNoteList, paginateElement] = paginateItems(noteList, 5, currentPage, setCurrentPage);

  return (
    <div>
      <h3>All Notes</h3>

      {paginatedNoteList}

      {paginateElement}
    </div>
  );
};
