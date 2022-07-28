import React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedPassage } from '../../../stores/UISlice';
import { MDNoteTaker } from './MDNoteTaker';
import { NotesForPassage } from './NotesForPassage';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { DownloadedNoteDetails, FetchFunction } from '../ReadPage';
import { Alert } from 'react-bootstrap';
import { useGetPassageByIdQuery } from '../../../services/PassagesService';

interface IPassageNotes {
  noteDetails: DownloadedNoteDetails;
  fetchNote: FetchFunction;
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
 * @param fetchNote Callback function to fetch a note by ID
 * @param showMDFullScreen Whether the MD editor should be shown full screen
 * @param setShowMDFullScreen Callback function to call when switching in/out of MD fullscreen
 * @param autosaveNotes Indicates whether notes should be autosaved (passthrough to `MDNoteTaker`)
 */
export const PassageNotes = ({
  noteDetails,
  fetchNote,
  showMDFullScreen,
  setShowMDFullScreen,
  autosaveNotes,
}: IPassageNotes) => {
  const selectedPassageID = useSelector(getSelectedPassage);
  const { data, error, isLoading } = useGetPassageByIdQuery(selectedPassageID);

  if (noteDetails.isLoading || (selectedPassageID !== '' && isLoading)) {
    return <LoadingMessage />;
  }
  if (noteDetails.error) {
    return <ErrorLoadingDataMessage theError={noteDetails.error} />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  if (!noteDetails.isDownloaded && selectedPassageID === '') {
    return (
      <>
        <h4>Notes</h4>
        <Alert variant="light">Please select a passage or note to take notes.</Alert>
      </>
    );
  }

  const showNotesForPassage = selectedPassageID !== '' && !showMDFullScreen;

  return (
    <>
      <h4>Notes</h4>
      <MDNoteTaker
        fetchNote={fetchNote}
        noteDetails={noteDetails}
        showMDFullScreen={showMDFullScreen}
        setShowMDFullScreen={setShowMDFullScreen}
        autosaveNotes={autosaveNotes}
      />

      {showNotesForPassage && (
        <NotesForPassage fetchNote={fetchNote} noteDetails={noteDetails} osis={data ? data.osis : ''} />
      )}
    </>
  );
};
