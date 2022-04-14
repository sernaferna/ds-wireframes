import React, { useCallback, useState } from 'react';
import { ReadSidebar } from './ReadSidebar';
import { PassageCards } from './PassageCards';
import { PassageLauncher } from './PassageLauncher';
import { useGetUserByIdQuery, HARDCODED_USER_ID } from '../../services/UserService';
import { useLazyGetNoteByIdQuery } from '../../services/VapiService';
import { useLazyGetPassageByIdQuery } from '../../services/PassagesService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
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
  const { data, error, isLoading } = useGetUserByIdQuery(HARDCODED_USER_ID);
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
  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  return (
    <Container fluid={true} className="page-main-container">
      <Row>
        <Col className="page-sidebar-container-col">
          <ReadSidebar />
        </Col>
        <Col className="page-main-content-col">
          <Row>
            <Col className="read-passagelauncher-col">
              <PassageLauncher defaultVersion={data!.settings.read.defaultVersion} />
            </Col>
            <Col className="read-passagecard-col">
              <PassageCards
                fetchNote={getNoteCallback}
                fetchPassage={getPassageCallback}
                passageDetails={downloadedPassageDetails}
              />
            </Col>
            <Col className="read-passagenotes-col">
              <PassageNotes
                fetchNote={getNoteCallback}
                fetchPassage={getPassageCallback}
                noteDetails={downloadedNoteDetails}
                passageDetails={downloadedPassageDetails}
              />
            </Col>
            <Col className="read-all-notes-col">
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
