import React, { useCallback, useState } from 'react';
import { PassageCards } from './PassageCards';
import { PassageLauncher } from './PassageLauncher';
import { useUserSettings } from '../../hooks/UserSettings';
import { useLazyGetNoteByIdQuery } from '../../services/VapiService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { Row, Col, Container } from 'react-bootstrap';
import { PassageNotes } from './notes/PassageNotes';
import { AllNotes } from './notes/AllNotes';
import { Note } from '@devouringscripture/common';

/**
 * Used to track the currently downloaded/downloading `Note` (if any).
 * For a number of components this is as much about whether a note is
 * **selected** as it is about the downloaded note details.
 */
export interface DownloadedNoteDetails {
  isLoading: boolean;
  isDownloaded: boolean;
  error?: any;
  note?: Note;
}

/**
 * Generic type for a function that can be used for fetching
 * a note or a passage.
 */
export type FetchFunction = (id: string) => void;

/**
 * Main page/component for the **Read** section of the app.
 *
 * There are a number of interrelated components coming under this one,
 * all of which need to know if a passage has been selected and/or if a
 * note has been selected. For this reason, this component has state
 * for the currently downloaded/downloading note and passage, as well
 * as callback functions for initiating those downloads, and these objects
 * and callbacks are passed through the tree of child components, so that
 * they are all up to date with each other. When a passage is selected
 * in any component, for example, the callback is called, which updates
 * the central object, which causes the tree of components to be rerendered.
 *
 * The overall tree of components is:
 *
 * * ReadPage: this page
 *   * PassageCards: list of all saved passages
 *     * PassageCard: Details about a particular passage
 *   * PassageNotes: Notes for a given passage
 *     * MDNoteTaker: Captures markdown notes for the given passage
 *     * NotesForPassage: List of previously captured notes for the given passage
 *       * NotesSnippet: Truncated view of note
 *   * AllNotes: Paginated list of all saved notes, regardless of passage
 *     * NotesSnippet: Truncated view of note
 */
export const ReadPage = () => {
  const [userData, userResponseError, userLoading] = useUserSettings();
  const [noteTrigger] = useLazyGetNoteByIdQuery();
  const [downloadedNoteDetails, updateDownloadedNoteDetails] = useState<DownloadedNoteDetails>({
    isLoading: false,
    isDownloaded: false,
  });
  const [showMDFullScreen, setShowMDFullScreen] = useState<boolean>(false);

  const getNoteCallback = useCallback(
    (noteId: string) => {
      if (noteId === '') {
        updateDownloadedNoteDetails({
          isLoading: false,
          isDownloaded: false,
        });
      } else {
        if (
          downloadedNoteDetails.note &&
          downloadedNoteDetails.note.id === noteId &&
          downloadedNoteDetails.isDownloaded
        ) {
          return;
        }
        updateDownloadedNoteDetails({
          ...downloadedNoteDetails,
          isLoading: true,
          isDownloaded: false,
        });
        noteTrigger(noteId)
          .unwrap()
          .then((response) => {
            updateDownloadedNoteDetails({
              isLoading: false,
              isDownloaded: true,
              note: response,
            });
          })
          .catch((err) => {
            updateDownloadedNoteDetails({
              isLoading: false,
              isDownloaded: false,
              error: err,
            });
          });
      }
    },
    [noteTrigger, updateDownloadedNoteDetails, downloadedNoteDetails]
  );

  const switchMDFullScreen = useCallback(
    (fs: boolean) => {
      setShowMDFullScreen(fs);
    },
    [setShowMDFullScreen]
  );

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  return (
    <>
      <Container fluid={true} className="m-0 p-0">
        <PassageLauncher defaultVersion={userData!.settings.read.defaultVersion} />
      </Container>
      <Container fluid={true} className="page-main-container">
        <Row>
          {!showMDFullScreen && (
            <Col xs="12" lg="6">
              <PassageCards fetchNote={getNoteCallback} sortOrder={userData!.settings.read.sortPassages} />
            </Col>
          )}
          <Col xs="12" lg={showMDFullScreen ? '12' : '6'}>
            <PassageNotes
              fetchNote={getNoteCallback}
              noteDetails={downloadedNoteDetails}
              setShowMDFullScreen={switchMDFullScreen}
              showMDFullScreen={showMDFullScreen}
              autosaveNotes={userData!.settings.read.autosavePassageNotes}
            />
          </Col>
          {!showMDFullScreen && (
            <Col xs="12">
              <AllNotes noteDetails={downloadedNoteDetails} fetchNote={getNoteCallback} />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};
