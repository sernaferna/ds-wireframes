import React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedPassage, getSelectedNote } from '../../../stores/UISlice';
import { MDNoteTaker } from './MDNoteTaker';
import { NotesForPassage } from './NotesForPassage';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { Alert } from 'react-bootstrap';
import { useGetPassageByIdQuery } from '../../../services/PassagesService';

interface IPassageNotes {
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
 * @param showMDFullScreen Whether the MD editor should be shown full screen
 * @param setShowMDFullScreen Callback function to call when switching in/out of MD fullscreen
 * @param autosaveNotes Indicates whether notes should be autosaved (passthrough to `MDNoteTaker`)
 */
export const PassageNotes = ({ showMDFullScreen, setShowMDFullScreen, autosaveNotes }: IPassageNotes) => {
  const selectedPassageID = useSelector(getSelectedPassage);
  const selectedNoteID = useSelector(getSelectedNote);
  const { data, error, isLoading } = useGetPassageByIdQuery(selectedPassageID);

  if (selectedPassageID !== '' && isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage theError={error} />;
  }

  if (selectedNoteID === '' && selectedPassageID === '') {
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
        showMDFullScreen={showMDFullScreen}
        setShowMDFullScreen={setShowMDFullScreen}
        autosaveNotes={autosaveNotes}
      />

      {showNotesForPassage && <NotesForPassage osis={data ? data.osis : ''} />}
    </>
  );
};
