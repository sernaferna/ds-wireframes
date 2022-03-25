import React, { useEffect, useReducer, Reducer, useCallback } from 'react';
import MDEditor, { ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';
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
} from '@devouringscripture/common';
import { useCreateNoteMutation, useLazyGetNoteByIdQuery, useUpdateNoteMutation } from '../../../services/VapiService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';

const lordCommand: ICommand = {
  name: 'LORD',
  keyCommand: 'LORD',
  buttonProps: { 'aria-label': 'Insert LORD' },
  icon: <b style={{ fontVariant: 'small-caps' }}>Lord</b>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `<span class="small-caps-style">Lord</span>`;
    api.replaceSelection(modifyText);
  },
};

const commandsToFilterOut = ['code', 'image', 'checked-list'];
const commandsFilter = (command: ICommand<string>, isExtra: boolean) => {
  if (isExtra) {
    return command;
  }

  if (new RegExp(commandsToFilterOut.join('|')).test(command.name as string)) {
    return false;
  }

  return command;
};

interface InternalState {
  value: string;
  startReference: string;
  endReference: string;
  showPreview: boolean;
  localSelectedReadingItem: string;
  localNoteId: string;
}

const initialInternalState: InternalState = {
  value: '',
  startReference: '',
  endReference: '',
  showPreview: false,
  localSelectedReadingItem: '',
  localNoteId: '',
};

enum ReducerActionType {
  SET_VALUE,
  SET_START_REF,
  SET_END_REF,
  SET_SHOW_PREVIEW,
  SET_LOCAL_SELECTED_READING_ITEM,
  RESET_FOR_SELECTED_NOTE,
  RESET_FOR_NOTE_RETRIEVED,
  RESET_FOR_PASSAGE_NO_NOTE,
}

type SetValueAction = {
  type: ReducerActionType.SET_VALUE;
  payload: string;
};

type SetStartRefAction = {
  type: ReducerActionType.SET_START_REF;
  payload: string;
};

type SetEndRefAction = {
  type: ReducerActionType.SET_END_REF;
  payload: string;
};

type SetShowPreviewAction = {
  type: ReducerActionType.SET_SHOW_PREVIEW;
  payload: boolean;
};

type SetLocalSelectedReadingItemAction = {
  type: ReducerActionType.SET_LOCAL_SELECTED_READING_ITEM;
  payload: string;
};

type ResetForSelectedNoteAction = {
  type: ReducerActionType.RESET_FOR_SELECTED_NOTE;
  payload: string;
};

type ResetForNoteRetrievedAction = {
  type: ReducerActionType.RESET_FOR_NOTE_RETRIEVED;
  payload: {
    startReference: string;
    endReference: string;
    value: string;
  };
};

type ResetForPassageNoNoteAction = {
  type: ReducerActionType.RESET_FOR_PASSAGE_NO_NOTE;
  payload: {
    startReference: string;
    endReference: string;
  };
};

type ReducerAction =
  | SetValueAction
  | SetStartRefAction
  | SetEndRefAction
  | SetShowPreviewAction
  | SetLocalSelectedReadingItemAction
  | ResetForSelectedNoteAction
  | ResetForNoteRetrievedAction
  | ResetForPassageNoNoteAction;

const useNoteReducer: Reducer<InternalState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case ReducerActionType.SET_VALUE:
      return { ...state, value: action.payload };
    case ReducerActionType.SET_START_REF:
      return { ...state, startReference: action.payload };
    case ReducerActionType.SET_END_REF:
      return { ...state, endReference: action.payload };
    case ReducerActionType.SET_SHOW_PREVIEW:
      return { ...state, showPreview: action.payload };
    case ReducerActionType.SET_LOCAL_SELECTED_READING_ITEM:
      return { ...state, localSelectedReadingItem: action.payload };
    case ReducerActionType.RESET_FOR_SELECTED_NOTE:
      return { ...state, localNoteId: action.payload, localSelectedReadingItem: '' };
    case ReducerActionType.RESET_FOR_NOTE_RETRIEVED:
      return {
        ...state,
        startReference: action.payload.startReference,
        endReference: action.payload.endReference,
        value: action.payload.value,
      };
    case ReducerActionType.RESET_FOR_PASSAGE_NO_NOTE:
      return {
        ...state,
        startReference: action.payload.startReference,
        endReference: action.payload.endReference,
        payload: '',
      };
  }
};

export const MDNoteTaker = () => {
  const [localState, dispatchLocalState] = useReducer(useNoteReducer, initialInternalState);
  const selectedReadingItem = useSelector(getSelectedReadingItem);
  const selectedNote = useSelector(getSelectedNote);
  const [passageTrigger, passageResult] = useLazyGetPassageByIdQuery();
  const [submitNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const dispatch = useDispatch();
  const [noteTrigger, noteResult] = useLazyGetNoteByIdQuery();

  /*
  Initialization of this component is complex, because there could be a 
  selected note, but if not there could be a selected passage, either of 
  which should be used to set the start/end passages.
  */
  useEffect(() => {
    if (passageResult.isLoading || passageResult.error || noteResult.isLoading || noteResult.error) {
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
      <MDEditor
        value={localState.value}
        onChange={(newValue) => {
          if (newValue) {
            dispatchLocalState({ type: ReducerActionType.SET_VALUE, payload: newValue });
          }
        }}
        autoFocus={true}
        highlightEnable={true}
        preview="edit"
        defaultTabEnable={true}
        extraCommands={[lordCommand]}
        visiableDragbar={false}
        commandsFilter={commandsFilter}
      />
      <div className="notes-bottom-panel">
        <Button variant="danger" onClick={newNoteBtn}>
          {selectedReadingItem ? 'New' : 'Close'}
        </Button>
        <Button variant="primary" onClick={submitForm}>
          {selectedNote ? 'Update' : 'Save'}
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            dispatchLocalState({ type: ReducerActionType.SET_SHOW_PREVIEW, payload: !localState.showPreview })
          }
        >
          {localState.showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </div>
      {localState.showPreview ? <MDEditor.Markdown className="notes-preview" source={localState.value} /> : ''}
    </>
  );
};
