import React, { useCallback, ChangeEvent, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotesFilter, updateNotesFilter } from '../../stores/UISlice';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useGetAllNotesQuery } from '../../services/VapiService';
import { ErrorLoadingDataMessage, LoadingMessage } from '../common/loading';
import { Note } from '@devouringscripture/common';
import { MarkdownPreview } from '../common/md-helpers/MarkdownPreview';
import { paginateItems } from '../../hooks/pagination';

export const AllNotes = () => {
  const filterString = useSelector(getNotesFilter);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllNotesQuery();
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(updateNotesFilter(e.target.value));
    },
    [dispatch]
  );

  const notesList = useMemo(() => {
    let notes: Note[] = [];
    if (!data) {
      return notes;
    }

    if (filterString.length > 0) {
      notes = data!.filter((item) => item.text.includes(filterString));
    } else {
      notes = data!;
    }

    return notes.map((item) => (
      <div className="my-4">
        <MarkdownPreview content={item.text} />
      </div>
    ));
  }, [data, filterString]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  const [paginatedNoteList, paginationElement] = paginateItems(notesList, 10, currentPage, setCurrentPage);

  return (
    <>
      <FloatingLabel controlId="floatingInput" label="Filter Notes..." className="mb-3">
        <Form.Control type="search" value={filterString} onChange={handleFilterChange} placeholder="Filter notes..." />
      </FloatingLabel>
      {paginatedNoteList}
      {paginationElement}
    </>
  );
};
