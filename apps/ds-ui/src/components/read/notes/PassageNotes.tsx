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
  showMDFullScreen: boolean;
  setShowMDFullScreen(fs: boolean): void;
  autosaveNotes: boolean;
}

/**
 * Component for taking notes for a given passage, as well as
 * displaying any previously captured notes that apply to that
 * passage.
 *
 * If no passage has been selected, a simple message is shown.
 * If a passage *is* selected, the `MDNoteTaker` and
 * `NotesForPassage` components are displayed.
 *
 * There are a number of interrelated pages to be aware of:
 *
 * * **ReadPage** includes *PassageNotes*
 * * *PassageNotes* displays **MDNoteTaker** and **NotesForPassage**
 *
 * @param noteDetails Details about the currently selected/downloaded note (if any)
 * @param passageDetails Details about the currently selected/downloaded passage (if any)
 * @param fetchNote Callback function to fetch a note by ID
 * @param fetchPassage Callback function to fetch a passage by ID
 * @param showMDFullScreen Whether the MD editor should be shown full screen
 * @param setShowMDFullScreen Callback function to call when switching in/out of MD fullscreen
 * @param autosaveNotes Indicates whether notes should be autosaved (passthrough to `MDNoteTaker`)
 */
export const PassageNotes = ({
  noteDetails,
  passageDetails,
  fetchNote,
  fetchPassage,
  showMDFullScreen,
  setShowMDFullScreen,
  autosaveNotes,
}: IPassageNotes) => {
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
      <MDNoteTaker
        fetchNote={fetchNote}
        noteDetails={noteDetails}
        passageDetails={passageDetails}
        showMDFullScreen={showMDFullScreen}
        setShowMDFullScreen={setShowMDFullScreen}
        autosaveNotes={autosaveNotes}
      />

      {passageDetails.isDownloaded && (
        <NotesForPassage
          fetchNote={fetchNote}
          fetchPassage={fetchPassage}
          noteDetails={noteDetails}
          osis={passageDetails.passage!.osis}
        />
      )}
    </>
  );
};
