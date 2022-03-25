import React, { useState } from 'react';
import MDEditor, { ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';
import Button from 'react-bootstrap/Button';

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

  if (new RegExp(commandsToFilterOut.join('|')).test(command.name!)) {
    return false;
  }

  return command;
};

interface MarkdownBoxParams {
  content: string;
  changeCallback: (newValue: string) => void;
  showPreview?: boolean;
}
export const MarkdownBox = ({ content, changeCallback, showPreview = false }: MarkdownBoxParams) => {
  const [showPreviewState, setShowPreviewState] = useState(showPreview);

  return (
    <div className="md-editor-parent">
      <div className="md-editor-main">
        <MDEditor
          value={content}
          onChange={(newValue) => {
            if (newValue) {
              changeCallback(newValue);
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
      </div>
      <div className="md-editor-preview">
        <Button size="sm" variant="secondary" onClick={() => setShowPreviewState(!showPreviewState)}>
          {showPreviewState ? 'Hide Preview' : 'Show Preview'}
        </Button>
        {showPreviewState ? <MDEditor.Markdown source={content} className="md-editor-preview-view" /> : <></>}
      </div>
    </div>
  );
};
