import React, { useState } from 'react';
import MDEditor, { ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { getSelectedReadingItem } from '../../../stores/UISlice';

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
  const [showPreview, setShowPreview] = useState(false);
  const selectedReadingItem = useSelector(getSelectedReadingItem);

  return (
    <>
      <p className="lead">Notes for {selectedReadingItem}</p>
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
            <Button variant="primary" className="ms-2">
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
          <Button variant="primary" className="ms-2">
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
