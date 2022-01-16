import React from 'react';
import { useGetAllNotesQuery } from '../../../services/VapiService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { NotesSnippet } from './NotesSnippet';
import Pagination from 'react-bootstrap/Pagination';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export const AllNotes = () => {
  const { data, error, isLoading } = useGetAllNotesQuery();

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const noteList = data!.map((item) => <NotesSnippet key={item.id} noteID={item.id} />);

  return (
    <div className="notelist-for-all">
      <h1>All Notes</h1>

      {noteList}

      <OverlayTrigger overlay={<Tooltip>Not implemented</Tooltip>}>
        <Pagination>
          <Pagination.First disabled />
          <Pagination.Prev disabled />
          <Pagination.Item disabled>{1}</Pagination.Item>
          <Pagination.Next disabled />
          <Pagination.Last disabled />
        </Pagination>
      </OverlayTrigger>
    </div>
  );
};
