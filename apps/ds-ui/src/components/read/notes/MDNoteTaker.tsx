import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import {
  BaseNote,
  Note,
  getFormattedReference,
  getRangesForOSIS,
  getOSISForReference,
} from '@devouringscripture/common';
import { useCreateNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } from '../../../services/VapiService';
import { useErrorsAndWarnings } from '../../../hooks/ErrorsAndWarning';
import { MarkdownBox } from '../../common/MarkdownBox';
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { DownloadedNoteDetails, DownloadedPassageDetails, FetchFunction } from '../ReadPage';
import { generateErrorStringFromError } from '../../common/loading';

const AUTOSAVE_INTERVAL = 3000;

const getStartEndForOsis = (osis: string): [string, string] => {
  const range = getRangesForOSIS(osis)[0];

  return [getFormattedReference(range.startOsisString), getFormattedReference(range.endOsisString)];
};

const schema = yup.object({
  value: yup.string(),
  startReference: yup.string(),
  endReference: yup.string(),
});
type ValuesSchema = yup.InferType<typeof schema>;

interface IMDNoteTaker {
  noteDetails: DownloadedNoteDetails;
  passageDetails: DownloadedPassageDetails;
  fetchNote: FetchFunction;
  showMDFullScreen: boolean;
  setShowMDFullScreen(fs: boolean): void;
  autosaveNotes: boolean;
}

/**
 * Component for taking notes for a given passage (in Markdown
 * format).
 *
 * There is some logic in this component to determine if a note is
 * downloaded or not (via the `noteDetails` param) as well as what
 * the start/end reference should be (via the `passageDetails`
 * param).
 *
 * Provides ability to save the note to the server via the API, with
 * the optional ability to *auto* save notes every few seconds. (The
 * `AUTOSAVE_INTERVAL` const controls how often saves occur.)
 *
 * There are a number of interrelated pages to be aware of:
 *
 * * **ReadPage** includes **PassageNotes**
 * * PassageNotes displays *MDNoteTaker* and **NotesForPassage**
 *
 * @param noteDetails Details about the downloaded note (if any)
 * @param passageDetails Details about the selected/downloaded passage
 * @param fetchNote Callback for fetching a note from the server; in this case, only called with an empty string, which serves to reset the currently selected note to nothing
 * @param showMDFullScreen Indicates if the MD editor should be shown full screen
 * @param setShowMDFullScreen Callback function to call when switching between full and non-full screen MD mode
 * @param autosaveNotes Indicates whether notes should be automatically saved every few seconds
 */
export const MDNoteTaker = ({
  noteDetails,
  passageDetails,
  fetchNote,
  showMDFullScreen,
  setShowMDFullScreen,
  autosaveNotes,
}: IMDNoteTaker) => {
  const [submitNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();
  const [AlertUI, addErrorMessage] = useErrorsAndWarnings();
  const mdRef = useRef<HTMLDivElement>(null);
  const formikRef = useRef<FormikProps<ValuesSchema>>(null);
  const [dirty, setDirty] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  const switchFS = useCallback(
    (fs: boolean) => {
      setShowMDFullScreen(fs);
      mdRef.current!.scrollIntoView({ behavior: 'smooth' });
    },
    [setShowMDFullScreen]
  );

  const downloadedNote = useMemo(() => {
    if (noteDetails.isDownloaded) {
      return noteDetails.note!.text;
    } else {
      return '';
    }
  }, [noteDetails]);

  const [downloadedStartRef, downloadedEndRef] = useMemo(() => {
    let start = '';
    let end = '';
    if (noteDetails.isDownloaded) {
      const [s, e] = getStartEndForOsis(noteDetails.note!.osis);
      start = s;
      end = e;
    } else if (passageDetails.isDownloaded) {
      const [s, e] = getStartEndForOsis(passageDetails.passage!.osis);
      start = s;
      end = e;
    }

    return [start, end];
  }, [noteDetails, passageDetails]);

  const initialValues = useMemo((): ValuesSchema => {
    return {
      value: downloadedNote,
      startReference: downloadedStartRef,
      endReference: downloadedEndRef,
    };
  }, [downloadedNote, downloadedStartRef, downloadedEndRef]);

  const newNoteBtn = () => {
    fetchNote('');
    setShowMDFullScreen(false);
  };

  const formSubmit = useCallback(
    (values: ValuesSchema) => {
      if (values.value === undefined || values.startReference === undefined || values.endReference === undefined) {
        addErrorMessage('Note not valid');
      }
      const textToSend = values.value!;
      const osisToSend = `${getOSISForReference(values.startReference!)}-${getOSISForReference(values.endReference!)}`;

      if (noteDetails.isDownloaded) {
        const newNote: Note = {
          ...noteDetails.note!,
          text: textToSend,
          osis: osisToSend,
        };
        setDirty(false);
        updateNote(newNote);
      } else {
        const newNote: BaseNote = {
          text: textToSend,
          osis: osisToSend,
        };
        setDirty(false);
        submitNote(newNote)
          .unwrap()
          .then((note) => {
            fetchNote(note.id);
          })
          .catch((error) => {
            addErrorMessage(generateErrorStringFromError(error));
          });
      }
    },
    [addErrorMessage, updateNote, submitNote, noteDetails, fetchNote]
  );

  const deleteNoteCallback = useCallback(() => {
    if (!noteDetails.note) {
      return;
    }

    deleteNote(noteDetails.note!.id);
    fetchNote('');
  }, [deleteNote, fetchNote, noteDetails.note]);

  const autoSaveFunc = () => {
    if (!dirty) {
      return;
    }

    formikRef.current!.handleSubmit();
    setTimer(null);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={formSubmit}
      validateOnBlur={false}
      validateOnChange={true}
      innerRef={formikRef}
    >
      {(fp: FormikProps<ValuesSchema>) => (
        <Form noValidate onSubmit={fp.handleSubmit}>
          <Row>
            <Col>
              <AlertUI />
            </Col>
          </Row>
          <Row ref={mdRef}>
            <Col>
              <Row>
                <Form.Label column="lg" lg="3">
                  From
                </Form.Label>
                <Col>
                  <Form.Control
                    name="startReference"
                    type="search"
                    placeholder="From..."
                    value={fp.values.startReference}
                    onChange={fp.handleChange}
                    onBlur={fp.handleBlur}
                    isValid={fp.touched.startReference && !fp.errors.startReference}
                    isInvalid={fp.touched.startReference && !!fp.errors.startReference}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Form.Label column="lg" lg="1">
                  to
                </Form.Label>
                <Col>
                  <Form.Control
                    type="search"
                    placeholder="To..."
                    value={fp.values.endReference}
                    onChange={fp.handleChange}
                    onBlur={fp.handleBlur}
                    name="endReference"
                    isValid={fp.touched.endReference && !fp.errors.endReference}
                    isInvalid={fp.touched.endReference && !!fp.errors.endReference}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <MarkdownBox
            content={fp.values.value || ''}
            changeCallback={(content) => {
              if (timer) {
                clearTimeout(timer);
              }

              setDirty(true);
              fp.setFieldValue('value', content);
              fp.setFieldTouched('value', true);
              if (autosaveNotes) {
                setTimer(setTimeout(autoSaveFunc, AUTOSAVE_INTERVAL));
              }
            }}
            fullscreenOption={true}
            showFullScreen={showMDFullScreen}
            setFullScreen={switchFS}
            showSidePreview={showMDFullScreen ? true : false}
          />
          <div className="m-2 d-flex flex-row-reverse">
            {noteDetails.isDownloaded && (
              <Button variant="danger" className="ms-2" onClick={deleteNoteCallback}>
                Delete
              </Button>
            )}
            {noteDetails.isDownloaded && (
              <Button variant="info" className="ms-2" onClick={newNoteBtn}>
                Close
              </Button>
            )}
            <Button disabled={!dirty} variant="primary" className="ms-2" type="submit">
              {noteDetails.isDownloaded ? 'Update' : 'Save'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
