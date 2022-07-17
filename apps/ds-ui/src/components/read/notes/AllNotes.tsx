import React, { useState, useMemo } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useGetAllNotesQuery } from '../../../services/VapiService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { NotesSnippet } from './NotesSnippet';
import { paginateItems } from '../../../hooks/pagination';
import { Note } from '@devouringscripture/common';
import { DownloadedNoteDetails, FetchFunction } from '../ReadPage';

/**
 * Helper to generate a set of `NotesSnippet` components, given an array of `Note` objects.
 *
 * @param data Array of `Note` objects to be rendered
 * @param downloadedNoteDetails Object with details about the note that has been (or is being) downloaded
 * @param fetchNote Callback to get a note based on ID
 * @param fetchPassage Callback to fetch a passage based on ID
 * @returns Array of `NotesSnippet` components
 */
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

/**
 * Component that displays a list of *all* saved notes, regardless of
 * what passages they do or do not cover.
 *
 * Depending on the size of the form factor, this may not be shown by
 * default, and the user may need to click a button to show it.
 *
 * @param noteDetails Details about the note that has been (or is being) downloaded, if any
 * @param fetchNote Callback function for retrieving a given note
 * @param fetchPassage Callback function for retrieving a given passage
 */
export const AllNotes = ({ noteDetails, fetchNote, fetchPassage }: IAllNotes) => {
  const { data, error, isLoading } = useGetAllNotesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllNotesClicked, setShowAllNotesClicked] = useState<boolean>(false);

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
    <>
      <Alert variant="dark" className={showAllNotesClicked ? 'd-none' : 'd-block d-lg-none'}>
        <Button variant="dark" onClick={() => setShowAllNotesClicked(true)}>
          Show All Notes
        </Button>
      </Alert>
      <div className={showAllNotesClicked ? 'd-block' : 'd-none d-lg-block'}>
        <h3>All Notes</h3>

        {paginatedNoteList}

        {paginateElement}
      </div>
    </>
  );
};
