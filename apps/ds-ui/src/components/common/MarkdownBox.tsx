import React, { useState, useMemo, useCallback } from 'react';
import MDEditor, { ICommand } from '@uiw/react-md-editor';
import { Button } from 'react-bootstrap';
import { MarkdownTutorial } from './md-tutorial/MarkdownTutorial';
import { getCommandList } from './md-helpers/md-commands';
import { MarkdownPreview } from './md-helpers/MarkdownPreview';
import { useUserSettings } from '../../hooks/UserSettings';
import { ClientSideErrorLoading, ErrorLoadingDataMessage, LoadingMessage } from './loading';
import { useWindowSize } from '../../hooks/WindowSize';
import { getHTMLForMD, getPluginList } from '@devouringscripture/remark-plugins';
import fileDownload from 'js-file-download';

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
  showToolbar?: boolean;
  showSidePreview?: boolean;
  fullscreenOption?: boolean;
  showFullScreen?: boolean;
  setFullScreen?: (fs: boolean) => void;
}

/**
 * Displays an editable text box accepting **Markdown** format, with
 * capabilities for handling some special MD formats (e.g. highlighting)
 * as well as plugins specific to Devouring Scripture.
 *
 * @param content The MD text to be displayed
 * @param changeCallback Callback function to be called as the text is modified
 * @param showToolbar Whether the toolbar should be shown (defaults to no)
 * @param showSidePreview  Whether the sidebar preview should be shown (defaults to no)
 * @param fullscreenOption Whether the UI should include a fullscreen option
 * @param showFullScreen Show in fullscreen mode (if `fullscreenOption` is `true`)
 * @param setFullScreen Callback called when fullscreen mode is switched
 */
export const MarkdownBox = ({
  content,
  changeCallback,
  showToolbar = true,
  showSidePreview = false,
  fullscreenOption = false,
  showFullScreen = false,
  setFullScreen = undefined,
}: IMarkdownBox) => {
  const [showPreviewState, setShowPreviewState] = useState<boolean>(false);
  const [showMDTutorial, setShowMDTutorial] = useState<boolean>(false);
  const [userData, userResponseError, userLoading] = useUserSettings();
  const windowSize = useWindowSize();

  const fsButton = useMemo(() => {
    if (!fullscreenOption) {
      return <></>;
    }

    if (showFullScreen) {
      return (
        <Button variant="link" size="sm" onClick={() => setFullScreen!(false)}>
          Show normal view
        </Button>
      );
    } else {
      return (
        <Button variant="link" size="sm" onClick={() => setFullScreen!(true)}>
          Show full screen
        </Button>
      );
    }
  }, [fullscreenOption, showFullScreen, setFullScreen]);

  const reversePreviewState = () => {
    return () => {
      setShowPreviewState(!showPreviewState);
    };
  };

  const handleChangeEvent = (newValue: string | undefined) => {
    changeCallback(newValue || '');
  };

  const handleHTMLDownload = useCallback(() => {
    const formattedHTML = getHTMLForMD(content);
    fileDownload(formattedHTML, 'notes.html');
  }, [content]);

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }
  if (fullscreenOption && !setFullScreen) {
    return (
      <ClientSideErrorLoading>
        <p>Error loading page; bad configuration.</p>
      </ClientSideErrorLoading>
    );
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
          height={showFullScreen ? windowSize.height - 250 : 200}
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

        {fsButton}

        <Button variant="link" size="sm" onClick={handleHTMLDownload}>
          Export HTML
        </Button>
      </div>
      {!showFullScreen && (
        <>
          <div className="d-grid gap-2">
            <Button size="sm" variant="secondary" onClick={reversePreviewState()}>
              {showPreviewState ? 'Hide Preview' : 'Show Preview'}
            </Button>

            {showPreviewState && <MarkdownPreview content={content} />}
          </div>
        </>
      )}

      <MarkdownTutorial
        show={showMDTutorial}
        handleClose={() => {
          setShowMDTutorial(false);
        }}
      />
    </div>
  );
};
