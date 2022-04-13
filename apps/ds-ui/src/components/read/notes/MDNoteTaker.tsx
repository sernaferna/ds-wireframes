import React, { useState, useReducer, useCallback, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedReadingItem, getSelectedNote, updateSelectedNote } from '../../../stores/UISlice';
import { useLazyGetPassageByIdQuery } from '../../../services/PassagesService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {
  BaseNote,
  Note,
  getFormattedReference,
  getRangesForOSIS,
  getOSISForReference,
} from '@devouringscripture/common';
import { useCreateNoteMutation, useLazyGetNoteByIdQuery, useUpdateNoteMutation } from '../../../services/VapiService';
import { LoadingMessage, ErrorLoadingDataMessage, generateErrorStringFromError } from '../../common/loading';
import { useErrorsAndWarnings } from '../../../helpers/ErrorsAndWarning';
import { MarkdownBox } from '../../common/MarkdownBox';
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';

const schema = yup.object({
  value: yup.string(),
  startReference: yup.string(),
  endReference: yup.string(),
});
type ValuesSchema = yup.InferType<typeof schema>;

export const MDNoteTaker = () => {
  const selectedReadingItem = useSelector(getSelectedReadingItem);
  const selectedNote = useSelector(getSelectedNote);
  const [noteDownloaded, setNoteDownloaded] = useState(false);
  const [passageDownloaded, setPassageDownloaded] = useState(false);
  const [passageTrigger, passageResult] = useLazyGetPassageByIdQuery();
  const [submitNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const dispatch = useDispatch();
  const [noteTrigger, noteResult] = useLazyGetNoteByIdQuery();
  const [AlertUI, addErrorMessage] = useErrorsAndWarnings();

  const initialValues = useMemo(() => {
    const initVals: ValuesSchema = {
      value: '',
      startReference: '',
      endReference: '',
    };

    if (selectedNote) {
      if (noteDownloaded) {
        const range = getRangesForOSIS(noteResult.data!.osis)[0];
        initVals.value = noteResult.data!.text;
        initVals.startReference = getFormattedReference(range.startOsisString);
        initVals.endReference = getFormattedReference(range.endOsisString);
      } else {
        noteTrigger(selectedNote)
          .unwrap()
          .then((response) => {
            const range = getRangesForOSIS(response.osis)[0];
            initVals.value = response.text;
            initVals.startReference = getFormattedReference(range.startOsisString);
            initVals.endReference = getFormattedReference(range.endOsisString);
            setNoteDownloaded(true);
          })
          .catch((err) => {
            addErrorMessage('Error downloading note from server');
            addErrorMessage(generateErrorStringFromError(err));
          });
      }
    } else {
      if (passageDownloaded) {
      } else {
        passageTrigger(selectedReadingItem)
          .unwrap()
          .then((response) => {
            const range = getRangesForOSIS(response.osis)[0];
            initVals.value = '';
            initVals.startReference = getFormattedReference(range.startOsisString);
            initVals.endReference = getFormattedReference(range.endOsisString);
            setPassageDownloaded(true);
          })
          .catch((err) => {
            addErrorMessage('Error downloading passage from server');
            addErrorMessage(generateErrorStringFromError(err));
          });
      }
    }

    return initVals;
  }, [
    selectedNote,
    noteDownloaded,
    noteTrigger,
    addErrorMessage,
    passageDownloaded,
    setPassageDownloaded,
    selectedReadingItem,
  ]);

  const newNoteBtn = useCallback(() => {
    dispatch(updateSelectedNote(''));
  }, [dispatch]);

  const formSubmit = useCallback(
    (values: ValuesSchema) => {
      if (values.value === undefined || values.startReference === undefined || values.endReference === undefined) {
        addErrorMessage('Note not valid');
      }
      const textToSend = values.value!;
      const osisToSend = `${getOSISForReference(values.startReference!)}-${getOSISForReference(values.endReference!)}`;

      if (selectedNote) {
        const newNote: Note = {
          ...noteResult.data!,
          text: textToSend,
          osis: osisToSend,
        };
        updateNote(newNote);
      } else {
        const newNote: BaseNote = {
          text: textToSend,
          osis: osisToSend,
        };
        submitNote(newNote);
      }
    },
    [addErrorMessage, updateNote, submitNote]
  );

  if (passageResult.isLoading || noteResult.isLoading) {
    return <LoadingMessage />;
  }
  if (passageResult.error || noteResult.error) {
    return <ErrorLoadingDataMessage />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={formSubmit}
      validateOnBlur={false}
      validateOnChange={true}
    >
      {(fp: FormikProps<ValuesSchema>) => (
        <Form noValidate onSubmit={fp.handleSubmit}>
          <Row>
            <Col>
              <AlertUI />
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Form.Label column="lg" lg="3">
                  From
                </Form.Label>
                <Col>
                  <Form.Control
                    type="search"
                    placeholder="From..."
                    value={fp.values.startReference}
                    onChange={fp.handleChange}
                    onBlur={fp.handleBlur}
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
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <MarkdownBox
            content={fp.values.value || ''}
            changeCallback={(content) => {
              //fp.handleChange();
            }}
          />
          <div className="notes-bottom-panel">
            <Button variant="danger" onClick={newNoteBtn}>
              {selectedReadingItem ? 'New' : 'Close'}
            </Button>
            <Button variant="primary" type="submit">
              {selectedNote ? 'Update' : 'Save'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
