import React from 'react';
import { MDNoteTaker } from './MDNoteTaker';
import { NotesForPassage } from './NotesForPassage';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { DownloadedNoteDetails, DownloadedPassageDetails, FetchFunction } from '../ReadPage';
import { Alert } from 'react-bootstrap';

interface IPassageNotes {
  noteDetails: DownloadedNoteDetails;
  passageDetails: DownloadedPassageDetails;
  fetchNote: FetchFunction;
  fetchPassage: FetchFunction;
}
export const PassageNotes = ({ noteDetails, passageDetails, fetchNote, fetchPassage }: IPassageNotes) => {
  if (noteDetails.isLoading || passageDetails.isLoading) {
    return <LoadingMessage />;
  }
  if (noteDetails.error) {
    return <ErrorLoadingDataMessage theError={noteDetails.error} />;
  }
  if (passageDetails.error) {
    return <ErrorLoadingDataMessage theError={passageDetails.error} />;
  }

  if (!noteDetails.isDownloaded && !passageDetails.isDownloaded) {
    return (
      <>
        <h4>Notes</h4>
        <Alert variant="primary">Please select a passage or note to take notes.</Alert>
      </>
    );
  }

  return (
    <>
      <h4>Notes</h4>
      <MDNoteTaker fetchNote={fetchNote} noteDetails={noteDetails} passageDetails={passageDetails} />

      {passageDetails.isDownloaded ? (
        <NotesForPassage
          fetchNote={fetchNote}
          fetchPassage={fetchPassage}
          noteDetails={noteDetails}
          osis={passageDetails.passage!.osis}
        />
      ) : (
        <></>
      )}
    </>
  );
};
