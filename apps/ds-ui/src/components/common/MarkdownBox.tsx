import React, { useState, useRef, useEffect } from 'react';
import MDEditor, { ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';
import { Button } from 'react-bootstrap';
import supersub from 'remark-supersub';
import { tac, lowerCaps, smallCaps, highlight, bibleLinks } from '@devouringscripture/remark-plugins';
import { MarkdownTutorial } from './MarkdownTutorial';

const MIN_SIZE_FOR_TOOLBAR = 450;

interface IMarkdownPreview {
  content: string;
  shaded?: boolean;
}
export const MarkdownPreview = ({ content, shaded = true }: IMarkdownPreview) => {
  const classNames: string = shaded ? 'bg-light border mx-1 my-2' : ';';
  return (
    <MDEditor.Markdown
      source={content}
      className={classNames}
      remarkPlugins={[tac, lowerCaps, smallCaps, highlight, supersub, bibleLinks]}
    />
  );
};

const lordCommand: ICommand = {
  name: 'LORD',
  keyCommand: 'LORD',
  buttonProps: { 'aria-label': 'Insert LORD' },
  icon: (
    <>
      <b>L</b>
      <b style={{ fontVariant: 'small-caps' }}>ord</b>
    </>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `^^^${state.selectedText ? state.selectedText : 'LORD'}^^^`;
    api.replaceSelection(modifyText);
  },
};

const scCommand: ICommand = {
  name: 'SC',
  keyCommand: 'SC',
  buttonProps: { 'aria-label': 'Insert all SMALL CAPS' },
  icon: <b style={{ fontVariant: 'small-caps', textTransform: 'lowercase', display: 'inline-block' }}>A.D.</b>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `^^${state.selectedText ? state.selectedText : 'A.D.'}^^`;
    api.replaceSelection(modifyText);
  },
};

const scstyleCommand: ICommand = {
  name: 'SmallCaps',
  keyCommand: 'SmallCaps',
  buttonProps: { 'aria-label': 'Insert Small Caps' },
  icon: <span style={{ fontVariant: 'small-caps' }}>SmCa</span>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `^-^${state.selectedText}^-^`;
    api.replaceSelection(modifyText);
  },
};

const superCommand: ICommand = {
  name: 'Superscript',
  keyCommand: 'Superscript',
  buttonProps: { 'aria-label': 'Superscript' },
  icon: (
    <b>
      2<sup>2</sup>
    </b>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `^${state.selectedText}^`;
    api.replaceSelection(modifyText);
  },
};

const highlightCommand: ICommand = {
  name: 'Highlight',
  keyCommand: 'Highlight',
  buttonProps: { 'aria-label': 'Highlight' },
  icon: <mark>abc</mark>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `==${state.selectedText}==`;
    api.replaceSelection(modifyText);
  },
};

const esvLinkCommand: ICommand = {
  name: 'ESVLink',
  keyCommand: 'ESVLink',
  buttonProps: { 'aria-label': 'Bible link' },
  icon: <u>ESV✞</u>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `[[${state.selectedText}]ESV]`;
    api.replaceSelection(modifyText);
  },
};

const nivLinkCommand: ICommand = {
  name: 'NIVLink',
  keyCommand: 'NIVLink',
  buttonProps: { 'aria-label': 'Bible link' },
  icon: <u>NIV✞</u>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `[[${state.selectedText}]NIV]`;
    api.replaceSelection(modifyText);
  },
};

const bibleLinkCommand: ICommand = {
  name: 'BibleLink',
  keyCommand: 'BibleLink',
  buttonProps: { 'aria-label': 'Bible link' },
  icon: <u>BG✞</u>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `[[${state.selectedText}]]`;
    api.replaceSelection(modifyText);
  },
};
const commandsToFilterOut = ['code', 'image', 'checked-list', 'hr', 'title2'];

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
  const mdContainer = useRef<HTMLDivElement>(null);
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const [showMDTutorial, setShowMDTutorial] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (mdContainer === null || mdContainer.current === null) {
        setShowToolbar(false);
        return;
      }

      if (mdContainer.current!.offsetWidth > MIN_SIZE_FOR_TOOLBAR) {
        setShowToolbar(true);
        return;
      }

      setShowToolbar(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
  }, [mdContainer, setShowToolbar]);

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
      <div ref={mdContainer} className="mb-2">
        <MDEditor
          id="this-is-the-editor"
          value={content}
          onChange={handleChangeEvent}
          highlightEnable={true}
          preview="edit"
          defaultTabEnable={true}
          extraCommands={[
            lordCommand,
            scCommand,
            scstyleCommand,
            esvLinkCommand,
            nivLinkCommand,
            bibleLinkCommand,
            superCommand,
            highlightCommand,
          ]}
          visiableDragbar={false}
          commandsFilter={commandsFilter}
          hideToolbar={!showToolbar}
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setShowMDTutorial(true);
          }}
        >
          Show Tutorial
        </Button>
        <MarkdownTutorial
          show={showMDTutorial}
          handleClose={() => {
            setShowMDTutorial(false);
          }}
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
