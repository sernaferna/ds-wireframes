import React, { useCallback, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
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
import { useCreateNoteMutation, useUpdateNoteMutation } from '../../../services/VapiService';
import { useErrorsAndWarnings } from '../../../helpers/ErrorsAndWarning';
import { MarkdownBox } from '../../common/MarkdownBox';
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { DownloadedNoteDetails, DownloadedPassageDetails, FetchFunction } from '../ReadPage';

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
}
export const MDNoteTaker = ({ noteDetails, passageDetails, fetchNote }: IMDNoteTaker) => {
  const [submitNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [AlertUI, addErrorMessage] = useErrorsAndWarnings();

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
        updateNote(newNote);
      } else {
        const newNote: BaseNote = {
          text: textToSend,
          osis: osisToSend,
        };
        submitNote(newNote);
      }
    },
    [addErrorMessage, updateNote, submitNote, noteDetails]
  );

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
              fp.setFieldValue('value', content);
              fp.setFieldTouched('value', true);
            }}
          />
          <div className="notes-bottom-panel">
            <Button variant="danger" onClick={newNoteBtn}>
              {passageDetails.isDownloaded ? 'New' : 'Close'}
            </Button>
            <Button variant="primary" type="submit">
              {noteDetails.isDownloaded ? 'Update' : 'Save'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
