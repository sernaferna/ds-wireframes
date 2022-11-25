import React, { useCallback, useState } from 'react';
import { PassageCards } from './PassageCards';
import { PassageLauncher } from './PassageLauncher';
import { useUserSettings } from '../../hooks/UserSettings';
import { LoadingMessage, ErrorLoadingDataMessage } from '../common/loading';
import { Row, Col, Container } from 'react-bootstrap';
import { PassageNotes } from './notes/PassageNotes';
import { AllNotes } from './notes/AllNotes';

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

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage errors={[userResponseError]} />;
  }

  return (
    <>
      <Container fluid={true} className="m-0 p-0">
        <PassageLauncher defaultVersion={userData!.settings.read.defaultVersion} />
      </Container>
      <Container fluid={true} className="page-main-container">
        <Row>
          <Col xs="12" lg="6">
            <PassageCards sortOrder={userData!.settings.read.sortPassages} />
          </Col>
          <Col xs="12" lg="6">
            <PassageNotes autosaveNotes={userData!.settings.read.autosavePassageNotes} />
          </Col>
          <Col xs="12">
            <AllNotes />
          </Col>
        </Row>
      </Container>
    </>
  );
};
