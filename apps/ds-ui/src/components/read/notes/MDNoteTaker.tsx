import React, { useState, useEffect } from 'react';
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
import { getFormattedReference, getRangesForOSIS, OSISRange, getOSISForReference } from '@devouringscripture/refparse';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BaseNote, Note } from '@devouringscripture/common';
import { useCreateNoteMutation, useLazyGetNoteByIdQuery, useUpdateNoteMutation } from '../../../services/VapiService';

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

export const MDNoteTaker = () => {
  const [value, setValue] = useState('');
  const [startPassage, setStartPassage] = useState('');
  const [endPassage, setEndPassage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [localSelectedReadingItem, setLocalSelectedReadingItem] = useState('');
  const [localNoteId, setLocalNoteId] = useState('');
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
    if (selectedNote) {
      console.log(`useEffect selectedNote ${selectedNote}`);
      if (selectedNote !== localNoteId) {
        console.log(`triggering API`);
        setLocalNoteId(selectedNote);
        setLocalSelectedReadingItem('');
        noteTrigger(selectedNote);
      }

      if (noteResult && noteResult.isSuccess && !noteResult.isLoading) {
        console.log(`note loading successful; noteResult: ${noteResult.data.osis}`);
        const bounds: OSISRange = getRangesForOSIS(noteResult.data.osis)[0];
        setStartPassage(getFormattedReference(bounds.startOsisString));
        setEndPassage(getFormattedReference(bounds.endOsisString));
        setValue(noteResult.data.text);
        return;
      }
    } else if (selectedReadingItem) {
      if (selectedReadingItem !== localSelectedReadingItem) {
        setLocalSelectedReadingItem(selectedReadingItem);
        passageTrigger(selectedReadingItem);
      }

      if (passageResult && passageResult.isSuccess && !passageResult.isLoading) {
        const bounds: OSISRange = getRangesForOSIS(passageResult.data.reference)[0];
        setStartPassage(getFormattedReference(bounds.startOsisString));
        setEndPassage(getFormattedReference(bounds.endOsisString));
        setValue('');
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
    localNoteId,
    localSelectedReadingItem,
  ]);

  const submitForm = () => {
    dispatch(updateSelectedReadingItem(''));

    if (selectedNote) {
      const newNote: Note = {
        ...noteResult.data!,
        text: value,
        osis: `${getOSISForReference(startPassage)}-${getOSISForReference(endPassage)}`,
      };
      updateNote(newNote);
      return;
    }
    const note: BaseNote = {
      text: value,
      osis: `${getOSISForReference(startPassage)}-${getOSISForReference(endPassage)}`,
    };

    submitNote(note);
  };

  const newNoteBtn = () => {
    dispatch(updateSelectedNote(''));
  };

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
                value={startPassage}
                onChange={(value) => setStartPassage(value.target.value)}
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
                value={endPassage}
                onChange={(value) => setEndPassage(value.target.value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <MDEditor
        value={value}
        onChange={(newValue) => {
          if (newValue) {
            setValue(newValue);
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
          New
        </Button>
        <Button variant="primary" onClick={submitForm}>
          {selectedNote ? 'Update' : 'Save'}
        </Button>
        <Button variant="secondary" onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </div>
      {showPreview ? <MDEditor.Markdown className="notes-preview" source={value} /> : ''}
    </>
  );
};
