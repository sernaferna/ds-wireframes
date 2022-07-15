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
  poetryQuoteCommand,
} from './md-helpers/md-commands';
import { MarkdownPreview } from './md-helpers/MarkdownPreview';
import supersub from 'remark-supersub';
import {
  tac,
  lowerCaps,
  smallCaps,
  highlight,
  bibleLinks,
  smartquotes,
  poetryBlocks,
  allCapReplacements,
  adbcReplacements,
} from '@devouringscripture/remark-plugins';
import { useUserSettings } from '../../hooks/UserSettings';
import { ErrorLoadingDataMessage, LoadingMessage } from './loading';

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

/**
 * Helper function to return a list of remark plugins to be used in rendering MD to HTML
 *
 * @param autoSmallCap Setting controlling whether uppercase text should be auto Small Caps
 * @param autoADBC Setting controlling whether A.D. / B.C. should be autoformatted
 * @returns List of plugins to be used for formatting MD, in the correct order they should be applied
 */
export const getPluginList = (autoSmallCap: boolean, autoADBC: boolean) => {
  const pluginList = [poetryBlocks, tac, lowerCaps, smallCaps, bibleLinks];
  if (autoADBC) {
    pluginList.push(adbcReplacements);
  }
  if (autoSmallCap) {
    pluginList.push(allCapReplacements);
  }
  pluginList.push(highlight, supersub, smartquotes);

  return pluginList;
};

/**
 * Helper function to get a list of commands to show in the MD Editor toolbar
 *
 * @param autoSmallCap Indicates whether small caps are automatically being converted (in which case the commmand won't show)
 * @param autoADBC Indicates whether A.D./B.C./B.C.E. are automatically being converted (in which case the command won't show)
 * @returns List of commands to show in the MD editor toolbar
 */
export const getCommandList = (autoSmallCap: boolean, autoADBC: boolean): ICommand[] => {
  const commandList: ICommand[] = [];

  if (!autoSmallCap) {
    commandList.push(lordCommand);
  }
  if (!autoADBC) {
    commandList.push(scCommand);
  }

  commandList.push(
    scstyleCommand,
    esvLinkCommand,
    nivLinkCommand,
    bibleLinkCommand,
    superCommand,
    highlightCommand,
    poetryQuoteCommand
  );

  return commandList;
};

interface IMarkdownBox {
  content: string;
  changeCallback: (newValue: string) => void;
  showToolbar?: boolean;
  showSidePreview?: boolean;
}
export const MarkdownBox = ({
  content,
  changeCallback,
  showToolbar = false,
  showSidePreview = false,
}: IMarkdownBox) => {
  const [showPreviewState, setShowPreviewState] = useState<boolean>(false);
  const [showMDTutorial, setShowMDTutorial] = useState<boolean>(false);
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);
  const [userData, userResponseError, userLoading] = useUserSettings();

  const reversePreviewState = () => {
    return () => {
      setShowPreviewState(!showPreviewState);
    };
  };

  const handleChangeEvent = (newValue: string | undefined) => {
    changeCallback(newValue || '');
  };

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  const pluginList = getPluginList(userData!.settings.write.autoSmallCaps, userData!.settings.write.autoADBC);
  const commandList = getCommandList(userData!.settings.write.autoSmallCaps, userData!.settings.write.autoADBC);

  return (
    <div>
      <div className="mb-2">
        <MDEditor
          value={content}
          onChange={handleChangeEvent}
          highlightEnable={true}
          preview={showSidePreview ? 'live' : 'edit'}
          defaultTabEnable={true}
          extraCommands={commandList}
          visiableDragbar={true}
          commandsFilter={commandsFilter}
          hideToolbar={!showToolbar}
          textareaProps={{ style: { fontFamily: 'Courier Prime, monospace' } }}
          style={{ fontFamily: 'Courier Prime, monospace' }}
          previewOptions={{
            remarkPlugins: pluginList,
          }}
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
              extraCommands={commandList}
              visiableDragbar={true}
              commandsFilter={commandsFilter}
              hideToolbar={false}
              previewOptions={{
                remarkPlugins: pluginList,
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
