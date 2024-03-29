import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, Form } from 'react-bootstrap';
import {
  BaseNote,
  Note,
  getFormattedReference,
  getRangesForOSIS,
  getContextForPassage,
  isReferenceValid,
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
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { ErrorLoadingDataMessage, generateErrorStringFromError, LoadingMessage } from '../../common/loading';
import { MarkdownBox } from '@devouringscripture/mde';

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
  startReference: yup
    .string()
    .required()
    .test('valid-ref', 'Invalid Reference', (value) => {
      if (value === undefined) {
        return false;
      }

      return isReferenceValid(value as string);
    }),
  endReference: yup
    .string()
    .required()
    .test('valid-ref', 'Invalid Reference', (value) => {
      if (value === undefined) {
        return false;
      }

      return isReferenceValid(value as string);
    }),
  version: yup.string().min(2).required('Version required'),
});
type ValuesSchema = yup.InferType<typeof schema>;

interface IMDNoteTaker {
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
 * @param autosaveNotes Indicates whether notes should be automatically saved every few seconds
 */
export const MDNoteTaker = ({ autosaveNotes }: IMDNoteTaker) => {
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
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  const downloadedNoteText = useMemo(() => {
    if (selectedNote && !noteIsLoading && selectedNoteID === selectedNote.id) {
      return selectedNote.text;
    } else {
      return '';
    }
  }, [selectedNote, selectedNoteID, noteIsLoading]);
  const [mdText, setMdText] = useState(downloadedNoteText);

  useEffect(() => {
    setMdText(downloadedNoteText);
  }, [setMdText, downloadedNoteText]);

  const [downloadedStartRef, downloadedEndRef, downloadedVersion] = useMemo(() => {
    let start = '';
    let end = '';
    let version = '';

    if (selectedNote && selectedNote.id === selectedNoteID) {
      const [s, e] = getStartEndForOsis(selectedNote.osis);
      start = s;
      end = e;
      if (selectedNote.version) {
        version = selectedNote.version;
      }
    } else if (passage) {
      const [s, e] = getStartEndForOsis(passage.osis);
      start = s;
      end = e;
      version = passage.version;
    }

    return [start, end, version];
  }, [selectedNote, passage, selectedNoteID]);

  const initialValues = useMemo(
    (): ValuesSchema => ({
      value: downloadedNoteText,
      startReference: downloadedStartRef,
      endReference: downloadedEndRef,
      version: downloadedVersion,
    }),
    [downloadedNoteText, downloadedStartRef, downloadedEndRef, downloadedVersion]
  );

  const newNoteBtn = () => {
    dispatch(updateSelectedNote(''));
  };

  const formSubmit = useCallback(
    (values: ValuesSchema, { setFieldTouched, setFieldValue }: FormikHelpers<ValuesSchema>) => {
      if (values.value === undefined) {
        addErrorMessage('Note not valid');
      }
      setFieldValue('value', mdText, false);
      setFieldTouched('value', true, false);
      const textToSend = mdText;
      const osisToSend = getContextForPassage(values.startReference, values.endReference);

      if (selectedNote) {
        const newNote: Note = {
          ...selectedNote,
          text: textToSend,
          osis: osisToSend,
          version: values.version,
        };
        updateNote(newNote)
          .unwrap()
          .then(() => {
            setFieldTouched('value', false);
          })
          .catch((err) => {
            addErrorMessage(generateErrorStringFromError(err));
          });
      } else {
        const newNote: BaseNote = {
          text: textToSend,
          osis: osisToSend,
          version: values.version,
        };
        submitNote(newNote)
          .unwrap()
          .then((note) => {
            dispatch(updateSelectedNote(note.id));
            setFieldTouched('value', false);
          })
          .catch((error) => {
            addErrorMessage(generateErrorStringFromError(error));
          });
      }
    },
    [addErrorMessage, updateNote, submitNote, dispatch, selectedNote, mdText]
  );

  const deleteNoteCallback = useCallback(() => {
    if (!selectedNote) {
      return;
    }

    deleteNote(selectedNote.id);
    dispatch(updateSelectedNote(''));
  }, [deleteNote, selectedNote, dispatch]);

  const autoSaveFunc = () => {
    formikRef.current!.handleSubmit();

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  if (passageIsLoading || noteIsLoading) {
    return <LoadingMessage />;
  }
  if (passageError || (selectedNoteID !== '' && noteError)) {
    return <ErrorLoadingDataMessage errors={[passageError, noteError]} />;
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
            <Col xs="5">
              <Form.Group>
                <Form.Label>From</Form.Label>
                <Form.Control
                  name="startReference"
                  type="search"
                  placeholder="From..."
                  value={fp.values.startReference}
                  onChange={(e) => {
                    fp.setFieldTouched('startReference', true, true);
                    fp.handleChange(e);
                  }}
                  onBlur={fp.handleBlur}
                  isValid={fp.touched.startReference && !fp.errors.startReference}
                  isInvalid={fp.touched.startReference && !!fp.errors.startReference}
                />
                <Form.Control.Feedback type="invalid">{fp.errors.startReference}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs="5">
              <Form.Group>
                <Form.Label>to</Form.Label>
                <Form.Control
                  type="search"
                  placeholder="To..."
                  value={fp.values.endReference}
                  onChange={(e) => {
                    fp.setFieldTouched('endReference', true, true);
                    fp.handleChange(e);
                  }}
                  onBlur={fp.handleBlur}
                  name="endReference"
                  isValid={fp.touched.endReference && !fp.errors.endReference}
                  isInvalid={fp.touched.endReference && !!fp.errors.endReference}
                />
                <Form.Control.Feedback type="invalid">{fp.errors.endReference}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs="2">
              <Form.Group>
                <Form.Label>Version</Form.Label>
                <Form.Control
                  type="search"
                  placeholder="ESV"
                  value={fp.values.version}
                  onChange={(e) => {
                    fp.setFieldTouched('version', true, true);
                    fp.handleChange(e);
                  }}
                  onBlur={fp.handleBlur}
                  name="version"
                  isValid={fp.touched.version && !fp.errors.version}
                  isInvalid={fp.touched.version && !!fp.errors.version}
                />
                <Form.Control.Feedback type="invalid">{fp.errors.version}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <MarkdownBox
            content={mdText || ''}
            defaultVersion={fp.values.version}
            passageContext={getContextForPassage(fp.values.startReference, fp.values.endReference)}
            changeCallback={(content) => {
              setMdText(content);
              fp.setFieldValue('value', content, false);
              fp.setFieldTouched('value', true, false);

              if (timer) {
                clearTimeout(timer);
              }

              if (autosaveNotes) {
                setTimer(setTimeout(autoSaveFunc, AUTOSAVE_INTERVAL));
              }
            }}
            fullScreenOption={true}
            height={10}
            fullScreenTitle={`Notes for ${getFormattedReference(
              getContextForPassage(fp.values.startReference, fp.values.endReference),
              false
            )}`}
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
            <Button
              disabled={!fp.touched.value && !fp.errors.endReference && !fp.errors.startReference && !fp.errors.version}
              variant="outline-primary"
              className="ms-2"
              type="submit"
            >
              {selectedNote ? 'Update' : 'Save'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
