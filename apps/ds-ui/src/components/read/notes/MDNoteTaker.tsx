import React, { useState, useEffect } from 'react';
import MDEditor, { ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedReadingItem, updateSelectedReadingItem } from '../../../stores/UISlice';
import { useGetPassageByIdQuery } from '../../../services/PassagesService';
import { LoadingMessage, ErrorLoadingDataMessage } from '../../common/loading';
import { getFormattedPassageRef, getPassagesForOSIS, PassageBounds, getOSISForRef } from '@devouringscripture/refparse';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BaseNote } from '@devouringscripture/common';
import { useCreateNoteMutation } from '../../../services/VapiService';

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
  const selectedReadingItem = useSelector(getSelectedReadingItem);
  const { data, error, isLoading } = useGetPassageByIdQuery(selectedReadingItem);
  const [submitNote] = useCreateNoteMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const passages: PassageBounds[] = getPassagesForOSIS(data!.reference);

      setStartPassage(getFormattedPassageRef(passages[0].startOsisString));
      setEndPassage(getFormattedPassageRef(passages[0].endOsisString));
    }
  }, [data]);

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorLoadingDataMessage />;
  }

  const submitForm = () => {
    const note: BaseNote = {
      text: value,
      osis: `${getOSISForRef(startPassage)}-${getOSISForRef(endPassage)}`,
    };

    submitNote(note);
    dispatch(updateSelectedReadingItem(''));
  };

  return (
    <>
      <p className="lead">Notes for {getFormattedPassageRef(data!.reference)}</p>
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
      {showPreview ? (
        <>
          <div className="m-2 d-flex flex-row-reverse">
            <Button variant="primary" className="ms-2" onClick={submitForm}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => setShowPreview(false)}>
              Hide Preview
            </Button>
          </div>
          <MDEditor.Markdown className="bg-light mx-1 my-2 border" source={value} />
        </>
      ) : (
        <div className="m-2 d-flex flex-row-reverse">
          <Button variant="primary" className="ms-2" onClick={submitForm}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => setShowPreview(true)}>
            Show Preview
          </Button>
        </div>
      )}
    </>
  );
};
