import React, { useState } from 'react';
import MDEditor, { ICommand } from '@uiw/react-md-editor';
import { Button, Modal } from 'react-bootstrap';
import { MarkdownTutorial } from './md-tutorial/MarkdownTutorial';
import {
  lordCommand,
  esvLinkCommand,
  nivLinkCommand,
  bibleLinkCommand,
  highlightCommand,
  scCommand,
  scstyleCommand,
  superCommand,
} from './md-helpers/md-commands';
import { MarkdownPreview } from './md-helpers/MarkdownPreview';
import supersub from 'remark-supersub';
import { tac, lowerCaps, smallCaps, highlight, bibleLinks, smartquotes } from '@devouringscripture/remark-plugins';

const commandsToFilterOut = ['code', 'image', 'checked-list', 'hr'];

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
  const [showMDTutorial, setShowMDTutorial] = useState<boolean>(false);
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);

  const reversePreviewState = () => {
    return () => {
      setShowPreviewState(!showPreviewState);
    };
  };

  const handleChangeEvent = (newValue: string | undefined) => {
    changeCallback(newValue || '');
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
          hideToolbar={true}
          textareaProps={{ style: { fontFamily: 'Courier Prime, monospace' } }}
          style={{ fontFamily: 'Courier Prime, monospace' }}
        />
        <Button
          variant="link"
          size="sm"
          onClick={() => {
            setShowMDTutorial(true);
          }}
        >
          Show Tutorial
        </Button>
        <Button variant="link" size="sm" onClick={() => setShowFullScreen(true)}>
          Full Screen
        </Button>
      </div>
      <div className="d-grid gap-2">
        <Button size="sm" variant="secondary" onClick={reversePreviewState()}>
          {showPreviewState ? 'Hide Preview' : 'Show Preview'}
        </Button>
        {showPreviewState ? <MarkdownPreview content={content} /> : <></>}
      </div>
      <MarkdownTutorial
        show={showMDTutorial}
        handleClose={() => {
          setShowMDTutorial(false);
        }}
      />
      <Modal show={showFullScreen} fullscreen="md-down" size="lg" onHide={() => setShowFullScreen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
            <MDEditor
              value={content}
              onChange={handleChangeEvent}
              highlightEnable={true}
              preview="live"
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
              visiableDragbar={true}
              commandsFilter={commandsFilter}
              hideToolbar={false}
              previewOptions={{
                remarkPlugins: [tac, lowerCaps, smallCaps, highlight, supersub, bibleLinks, smartquotes],
              }}
              textareaProps={{ style: { fontFamily: 'Courier Prime, monospace' } }}
              style={{ fontFamily: 'Courier Prime, monospace' }}
            />
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setShowMDTutorial(true);
              }}
            >
              Show Tutorial
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
