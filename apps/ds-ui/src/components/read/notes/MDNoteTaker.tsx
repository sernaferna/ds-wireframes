import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, Form } from 'react-bootstrap';
import {
  BaseNote,
  Note,
  getFormattedReference,
  getRangesForOSIS,
  getOSISForReference,
} from '@devouringscripture/common';
import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useGetNoteByIdQuery,
} from '../../../services/VapiService';
import { useGetPassageByIdQuery } from '../../../services/PassagesService';
import { getSelectedPassage, getSelectedNote, updateSelectedNote } from '../../../stores/UISlice';
import { useErrorsAndWarnings } from '../../../hooks/ErrorsAndWarning';
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { ErrorLoadingDataMessage, generateErrorStringFromError, LoadingMessage } from '../../common/loading';
import { MarkdownBox } from '../../common/markdown/MarkdownBox';

const AUTOSAVE_INTERVAL = 3000;

const getStartEndForOsis = (osis: string): [string, string] => {
  if (!osis || osis.length < 1) {
    return ['', ''];
  }

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
 * @param showMDFullScreen Indicates if the MD editor should be shown full screen
 * @param setShowMDFullScreen Callback function to call when switching between full and non-full screen MD mode
 * @param autosaveNotes Indicates whether notes should be automatically saved every few seconds
 */
export const MDNoteTaker = ({ showMDFullScreen, setShowMDFullScreen, autosaveNotes }: IMDNoteTaker) => {
  const selectedPassageID = useSelector(getSelectedPassage);
  const selectedNoteID = useSelector(getSelectedNote);
  const {
    data: passage,
    error: passageError,
    isLoading: passageIsLoading,
  } = useGetPassageByIdQuery(selectedPassageID, {
    skip: selectedPassageID === '' ? true : false,
  });
  const {
    data: selectedNote,
    error: noteError,
    isLoading: noteIsLoading,
  } = useGetNoteByIdQuery(selectedNoteID, { skip: selectedNoteID === '' ? true : false });
  const [submitNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();
  const dispatch = useDispatch();
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

  const downloadedNoteText = useMemo(() => {
    if (selectedNote && !noteIsLoading && selectedNoteID === selectedNote.id) {
      return selectedNote.text;
    } else {
      return '';
    }
  }, [selectedNote, selectedNoteID, noteIsLoading]);

  const [downloadedStartRef, downloadedEndRef] = useMemo(() => {
    let start = '';
    let end = '';

    if (selectedNote && selectedNote.id === selectedNoteID) {
      const [s, e] = getStartEndForOsis(selectedNote.osis);
      start = s;
      end = e;
    } else if (passage) {
      const [s, e] = getStartEndForOsis(passage.osis);
      start = s;
      end = e;
    }

    return [start, end];
  }, [selectedNote, passage, selectedNoteID]);

  const initialValues = useMemo(
    (): ValuesSchema => ({
      value: downloadedNoteText,
      startReference: downloadedStartRef,
      endReference: downloadedEndRef,
    }),
    [downloadedNoteText, downloadedStartRef, downloadedEndRef]
  );

  const newNoteBtn = () => {
    dispatch(updateSelectedNote(''));
    setShowMDFullScreen(false);
  };

  const formSubmit = useCallback(
    (values: ValuesSchema) => {
      if (values.value === undefined || values.startReference === undefined || values.endReference === undefined) {
        addErrorMessage('Note not valid');
      }
      const textToSend = values.value!;
      const osisToSend = `${getOSISForReference(values.startReference!)}-${getOSISForReference(values.endReference!)}`;

      if (selectedNote) {
        const newNote: Note = {
          ...selectedNote,
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
            dispatch(updateSelectedNote(note.id));
          })
          .catch((error) => {
            addErrorMessage(generateErrorStringFromError(error));
          });
      }
    },
    [addErrorMessage, updateNote, submitNote, dispatch, selectedNote]
  );

  const deleteNoteCallback = useCallback(() => {
    if (!selectedNote) {
      return;
    }

    deleteNote(selectedNote.id);
    dispatch(updateSelectedNote(''));
  }, [deleteNote, selectedNote, dispatch]);

  const autoSaveFunc = () => {
    if (!dirty) {
      return;
    }

    formikRef.current!.handleSubmit();
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  if (passageIsLoading || noteIsLoading) {
    return <LoadingMessage />;
  }
  if (passageError) {
    return <ErrorLoadingDataMessage theError={passageError} />;
  }
  if (selectedNoteID !== '' && noteError) {
    return <ErrorLoadingDataMessage theError={noteError} />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={formSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      innerRef={formikRef}
      enableReinitialize={true}
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
              fp.setFieldValue('value', content, false);
              fp.setFieldTouched('value', true);
              if (autosaveNotes) {
                setTimer(setTimeout(autoSaveFunc, AUTOSAVE_INTERVAL));
              }
            }}
            fullScreenOption={true}
            showingFullScreen={showMDFullScreen}
            setFullSreen={switchFS}
            showSidePreview={showMDFullScreen ? true : false}
            height={10}
          />
          <div className="m-2 d-flex flex-row-reverse">
            {selectedNote && (
              <Button variant="outline-warning" className="ms-2" onClick={deleteNoteCallback}>
                Delete
              </Button>
            )}
            {selectedNote && (
              <Button variant="outline-secondary" className="ms-2" onClick={newNoteBtn}>
                Close
              </Button>
            )}
            <Button disabled={!dirty} variant="outline-primary" className="ms-2" type="submit">
              {selectedNote ? 'Update' : 'Save'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
