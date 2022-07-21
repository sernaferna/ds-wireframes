import React, { useCallback, useState } from 'react';
import { PassageCards } from './PassageCards';
import { PassageLauncher } from './PassageLauncher';
import { useUserSettings } from '../../hooks/UserSettings';
import { useLazyGetNoteByIdQuery } from '../../services/VapiService';
import { useLazyGetPassageByIdQuery } from '../../services/PassagesService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { Row, Col, Container } from 'react-bootstrap';
import { PassageNotes } from './notes/PassageNotes';
import { AllNotes } from './notes/AllNotes';
import { Note, Passage } from '@devouringscripture/common';

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
 * Used to track the currently downloaded/downloading `Passage` (if
 * any). For a number of components this is as much about whether a
 * passage is **selected** as it is about the downloaded passage
 * details, however, the downloaded passage does have some details
 * that are used as well.
 */
export interface DownloadedPassageDetails {
  isLoading: boolean;
  isDownloaded: boolean;
  error?: any;
  passage?: Passage;
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
  const [passageTrigger] = useLazyGetPassageByIdQuery();
  const [downloadedNoteDetails, updateDownloadedNoteDetails] = useState<DownloadedNoteDetails>({
    isLoading: false,
    isDownloaded: false,
  });
  const [downloadedPassageDetails, updateDownloadedPassageDetails] = useState<DownloadedPassageDetails>({
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

  const getPassageCallback = useCallback(
    (passageId: string) => {
      if (passageId === '') {
        updateDownloadedPassageDetails({
          isLoading: false,
          isDownloaded: false,
        });
      } else {
        updateDownloadedPassageDetails({
          ...downloadedPassageDetails,
          isLoading: true,
          isDownloaded: false,
        });
        passageTrigger(passageId)
          .unwrap()
          .then((response) => {
            updateDownloadedPassageDetails({
              isLoading: false,
              isDownloaded: true,
              passage: response,
            });
          })
          .catch((err) => {
            updateDownloadedPassageDetails({
              isLoading: false,
              isDownloaded: true,
              error: err,
            });
          });
      }
    },
    [passageTrigger, updateDownloadedPassageDetails, downloadedPassageDetails]
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
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col xs="12" className="mb-2">
          <PassageLauncher defaultVersion={userData!.settings.read.defaultVersion} />
        </Col>
        <Col xs="12" lg="6" className={showMDFullScreen ? 'd-none' : ''}>
          <PassageCards
            fetchNote={getNoteCallback}
            fetchPassage={getPassageCallback}
            passageDetails={downloadedPassageDetails}
            sortOrder={userData!.settings.read.sortPassages}
          />
        </Col>
        <Col xs="12" lg={showMDFullScreen ? '12' : '6'}>
          <PassageNotes
            fetchNote={getNoteCallback}
            fetchPassage={getPassageCallback}
            noteDetails={downloadedNoteDetails}
            passageDetails={downloadedPassageDetails}
            setShowMDFullScreen={switchMDFullScreen}
            showMDFullScreen={showMDFullScreen}
            autosaveNotes={userData!.settings.read.autosavePassageNotes}
          />
        </Col>
        <Col xs="12" className={showMDFullScreen ? 'd-none' : 'mt-4'}>
          <AllNotes noteDetails={downloadedNoteDetails} fetchNote={getNoteCallback} fetchPassage={getPassageCallback} />
        </Col>
      </Row>
    </Container>
  );
};
