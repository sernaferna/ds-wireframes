import React, { useState } from 'react';
import MDEditor, { ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';
import Button from 'react-bootstrap/Button';

interface IMarkdownPreview {
  content: string;
}
export const MarkdownPreview = ({ content }: IMarkdownPreview) => {
  return <MDEditor.Markdown source={content} className="md-editor-preview-view" />;
};

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
    <div className="md-editor-parent">
      <div className="md-editor-main">
        <MDEditor
          value={content}
          onChange={handleChangeEvent}
          highlightEnable={true}
          preview="edit"
          defaultTabEnable={true}
          extraCommands={[lordCommand]}
          visiableDragbar={false}
          commandsFilter={commandsFilter}
        />
      </div>
      <div className="md-editor-preview">
        <Button onClick={reversePreviewState()}>{showPreviewState ? 'Hide Preview' : 'Show Preview'}</Button>
        {showPreviewState ? <MarkdownPreview content={content} /> : <></>}
      </div>
    </div>
  );
};
