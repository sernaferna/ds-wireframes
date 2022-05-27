import React, { useState } from 'react';
import MDEditor, { ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';
import { Button } from 'react-bootstrap';

interface IMarkdownPreview {
  content: string;
  shaded?: boolean;
}
export const MarkdownPreview = ({ content, shaded = true }: IMarkdownPreview) => {
  const classNames: string = shaded ? 'bg-light border mx-1 my-2' : ';';
  return <MDEditor.Markdown source={content} className={classNames} />;
};

const lordCommand: ICommand = {
  name: 'LORD',
  keyCommand: 'LORD',
  buttonProps: { 'aria-label': 'Insert LORD' },
  icon: <b className="sc">LORD</b>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `<span class="sc">LORD</span>`;
    api.replaceSelection(modifyText);
  },
};

const scCommand: ICommand = {
  name: 'SC',
  keyCommand: 'SC',
  buttonProps: { 'aria-label': 'Insert all SMALL CAPS' },
  icon: <b className="sc2">A.D.</b>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `<span class="sc2">${state.selectedText ? state.selectedText : 'A.D.'}</span>`;
    api.replaceSelection(modifyText);
  },
};

const scstyleCommand: ICommand = {
  name: 'SmallCaps',
  keyCommand: 'SmallCaps',
  buttonProps: { 'aria-label': 'Insert Small Caps' },
  icon: <span className="small-caps-style">SmCa</span>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `<span class="small-caps-style">${state.selectedText}</span>`;
    api.replaceSelection(modifyText);
  },
};

const commandsToFilterOut = ['code', 'image', 'checked-list'];

const commandsFilter = (command: ICommand<string>, isExtra: boolean) => {
  if (isExtra) {
    return command;
  }

  if (new RegExp(commandsToFilterOut.join('|')).test(command.name!)) {
    return false;
  }

  return command;
};

interface IMarkdownBox {
  content: string;
  changeCallback: (newValue: string) => void;
  showPreview?: boolean;
}
export const MarkdownBox = ({ content, changeCallback, showPreview = false }: IMarkdownBox) => {
  const [showPreviewState, setShowPreviewState] = useState(showPreview);

  const reversePreviewState = () => {
    return () => {
      setShowPreviewState(!showPreviewState);
    };
  };

  const handleChangeEvent = (newValue: string | undefined) => {
    if (newValue) {
      changeCallback(newValue);
    }
  };

  return (
    <div>
      <div className="mb-2">
        <MDEditor
          value={content}
          onChange={handleChangeEvent}
          highlightEnable={true}
          preview="edit"
          defaultTabEnable={true}
          extraCommands={[lordCommand, scCommand, scstyleCommand]}
          visiableDragbar={false}
          commandsFilter={commandsFilter}
        />
      </div>
      <div className="d-grid gap-2">
        <Button size="sm" variant="secondary" onClick={reversePreviewState()}>
          {showPreviewState ? 'Hide Preview' : 'Show Preview'}
        </Button>
        {showPreviewState ? <MarkdownPreview content={content} /> : <></>}
      </div>
    </div>
  );
};
