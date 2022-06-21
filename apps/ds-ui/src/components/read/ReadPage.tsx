import React, { useCallback, useState } from 'react';
import { ReadSidebar } from './ReadSidebar';
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

export interface DownloadedNoteDetails {
  isLoading: boolean;
  isDownloaded: boolean;
  error?: any;
  note?: Note;
}

export interface DownloadedPassageDetails {
  isLoading: boolean;
  isDownloaded: boolean;
  error?: any;
  passage?: Passage;
}

export type FetchFunction = (id: string) => void;

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

  const getNoteCallback = useCallback(
    (noteId: string) => {
      if (noteId === '') {
        updateDownloadedNoteDetails({
          isLoading: false,
          isDownloaded: false,
        });
      } else {
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
  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <ReadSidebar />
        </Col>
        <Col className="page-main-content-col">
          <h1 className="d-none d-md-block">Read the Scripture</h1>
          <Row>
            <Col xs="12" className="mb-2">
              <PassageLauncher defaultVersion={userData!.settings.read.defaultVersion} />
            </Col>
            <Col xs="12" lg="6">
              <PassageCards
                fetchNote={getNoteCallback}
                fetchPassage={getPassageCallback}
                passageDetails={downloadedPassageDetails}
              />
            </Col>
            <Col xs="12" lg="6">
              <PassageNotes
                fetchNote={getNoteCallback}
                fetchPassage={getPassageCallback}
                noteDetails={downloadedNoteDetails}
                passageDetails={downloadedPassageDetails}
              />
            </Col>
            <Col xs="12" className="mt-4">
              <AllNotes
                noteDetails={downloadedNoteDetails}
                fetchNote={getNoteCallback}
                fetchPassage={getPassageCallback}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
