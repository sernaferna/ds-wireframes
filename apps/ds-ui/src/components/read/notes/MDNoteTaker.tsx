import React, { useEffect, useReducer, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSelectedReadingItem,
  updateSelectedReadingItem,
  getSelectedNote,
  updateSelectedNote,
} from '../../../stores/UISlice';
import { useLazyGetPassageByIdQuery } from '../../../services/PassagesService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {
  BaseNote,
  Note,
  getFormattedReference,
  getRangesForOSIS,
  OSISRange,
  getOSISForReference,
  ErrorResponse,
} from '@devouringscripture/common';
import { useCreateNoteMutation, useLazyGetNoteByIdQuery, useUpdateNoteMutation } from '../../../services/VapiService';
import { LoadingMessage, ErrorLoadingDataMessage, generateErrorStringFromError } from '../../common/loading';
import { useErrorsAndWarnings } from '../../../helpers/ErrorsAndWarning';
import { MarkdownBox } from '../../common/MarkdownBox';
import { useNoteReducer, ReducerActionType, initialInternalState } from './MDNoteReducer';

export const MDNoteTaker = () => {
  const [localState, dispatchLocalState] = useReducer(useNoteReducer, initialInternalState);
  const selectedReadingItem = useSelector(getSelectedReadingItem);
  const selectedNote = useSelector(getSelectedNote);
  const [passageTrigger, passageResult] = useLazyGetPassageByIdQuery();
  const [submitNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const dispatch = useDispatch();
  const [noteTrigger, noteResult] = useLazyGetNoteByIdQuery();
  const [AlertUI, addErrorMessage] = useErrorsAndWarnings();

  /*
  Initialization of this component is complex, because there could be a 
  selected note, but if not there could be a selected passage, either of 
  which should be used to set the start/end passages.
  */
  useEffect(() => {
    if (passageResult.error) {
      if ('data' in passageResult.error) {
        addErrorMessage(generateErrorStringFromError(passageResult.error.data as ErrorResponse));
      } else {
        addErrorMessage('Error retrieving passage from server');
      }
      return;
    }
    if (noteResult.error) {
      if ('data' in noteResult.error) {
        addErrorMessage(generateErrorStringFromError(noteResult.error.data as ErrorResponse));
      } else {
        addErrorMessage('Error retrieving note from server');
      }
      return;
    }
    if (passageResult.isLoading || noteResult.isLoading) {
      return;
    }

    if (selectedNote) {
      if (selectedNote !== localState.localNoteId) {
        dispatchLocalState({ type: ReducerActionType.RESET_FOR_SELECTED_NOTE, payload: selectedNote });
        noteTrigger(selectedNote);
      }

      if (noteResult && noteResult.isSuccess && !noteResult.isLoading) {
        const range: OSISRange = getRangesForOSIS(noteResult.data.osis)[0];
        dispatchLocalState({
          type: ReducerActionType.RESET_FOR_NOTE_RETRIEVED,
          payload: {
            startReference: getFormattedReference(range.startOsisString),
            endReference: getFormattedReference(range.endOsisString),
            value: noteResult.data.text,
          },
        });
        return;
      }
    } else if (selectedReadingItem) {
      if (selectedReadingItem !== localState.localSelectedReadingItem) {
        dispatchLocalState({ type: ReducerActionType.SET_LOCAL_SELECTED_READING_ITEM, payload: selectedReadingItem });
        passageTrigger(selectedReadingItem);
      }

      if (passageResult && passageResult.isSuccess && !passageResult.isLoading) {
        const range: OSISRange = getRangesForOSIS(passageResult.data.osis)[0];
        dispatchLocalState({
          type: ReducerActionType.RESET_FOR_PASSAGE_NO_NOTE,
          payload: {
            startReference: getFormattedReference(range.startOsisString),
            endReference: getFormattedReference(range.endOsisString),
          },
        });
        return;
      }
    }
  }, [
    selectedReadingItem,
    selectedNote,
    passageResult,
    noteResult,
    noteTrigger,
    passageTrigger,
    localState.localNoteId,
    localState.localSelectedReadingItem,
    addErrorMessage,
  ]);

  const submitForm = useCallback(() => {
    dispatch(updateSelectedReadingItem(''));

    if (selectedNote) {
      const newNote: Note = {
        ...noteResult.data!,
        text: localState.value,
        osis: `${getOSISForReference(localState.startReference)}-${getOSISForReference(localState.endReference)}`,
      };
      updateNote(newNote);
      return;
    }
    const note: BaseNote = {
      text: localState.value,
      osis: `${getOSISForReference(localState.startReference)}-${getOSISForReference(localState.endReference)}`,
    };

    submitNote(note);
  }, [
    dispatch,
    selectedNote,
    noteResult,
    localState.value,
    localState.startReference,
    localState.endReference,
    updateNote,
    submitNote,
  ]);

  const newNoteBtn = useCallback(() => {
    dispatch(updateSelectedNote(''));
  }, [dispatch]);

  if (passageResult.isLoading || noteResult.isLoading) {
    return <LoadingMessage />;
  }
  if (passageResult.error || noteResult.error) {
    return <ErrorLoadingDataMessage />;
  }

  return (
    <>
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
                value={localState.startReference}
                onChange={(value) =>
                  dispatchLocalState({ type: ReducerActionType.SET_START_REF, payload: value.target.value })
                }
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
                value={localState.endReference}
                onChange={(value) =>
                  dispatchLocalState({ type: ReducerActionType.SET_END_REF, payload: value.target.value })
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <MarkdownBox
        content={localState.value}
        changeCallback={(content) => {
          dispatchLocalState({ type: ReducerActionType.SET_VALUE, payload: content });
        }}
      />
      <div className="notes-bottom-panel">
        <Button variant="danger" onClick={newNoteBtn}>
          {selectedReadingItem ? 'New' : 'Close'}
        </Button>
        <Button variant="primary" onClick={submitForm}>
          {selectedNote ? 'Update' : 'Save'}
        </Button>
      </div>
    </>
  );
};
