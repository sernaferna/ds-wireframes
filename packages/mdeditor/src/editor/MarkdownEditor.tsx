import React, { useState, useMemo, useCallback } from 'react';
import MDEditor, { ICommand } from '@uiw/react-md-editor';
import { Button } from 'react-bootstrap';
import fileDownload from 'js-file-download';
import { getHTMLForMD, getPluginList } from '@devouringscripture/remark-plugins';
import { getCommandsList } from './commands/editor-commands';
import { MDViewer } from '../viewer/MDViewer';

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

export interface IMarkdownEditor {
  content: string;
  changeCallback: (newValue: string) => void;
  showToolbar?: boolean;
  showSidePreview?: boolean;
  allowFullScreenOption?: boolean;
  isFullScreen?: boolean;
  setFullScreen?: (fs: boolean) => void;
}

/**
 * Text box widget that accepts **Markdown**  content, with a number
 * of features specifically added for the **Devouring Scripture**
 * app.
 *
 * Since the widget can be hosted in a variety of different contexts,
 * there are options for turning on/off certain features. Specifically
 * for options around fullscreen view, if any of `allowFullScreenOption`,
 * `isFullScreen`, or `setFullScreen` are set, they *all* must be set.
 *
 * @param content The markdown content to display/edit
 * @param changeCallback Function to call anytime the text is modified by the editor
 * @param showToolbar Indicates if the toolbar should be displayed (true) or not (false); defailts to true
 * @param showSidePreview Indicates if the side-by-side preview should be shown (true) or not (false); defaults to false
 * @param allowFullScreenOption Indicates if the widget can switch itself to fullscreen mode (true) or not (false); defaults to true
 * @param isFullScreen indicates if the widget is currently being shown fullscreen (true) or not (false); defaults to false
 * @param setFullScreen Function to be called when the widget switches itself to or from fullscreen view
 */
export const MarkdownEditor = ({
  content,
  changeCallback,
  showToolbar = true,
  showSidePreview = false,
  allowFullScreenOption = false,
  isFullScreen = false,
  setFullScreen = undefined,
}: IMarkdownEditor) => {
  const [showPreviewState, setShowPreviewState] = useState<boolean>(false);
  const [showMDTutorial, setShowMDTutorial] = useState<boolean>(false);
  // TODO const windowSize = showWindowSize()
  // TODO when that's done set the height of the `MDEditor`

  const fsButton = useMemo(() => {
    if (!allowFullScreenOption) {
      return <></>;
    }

    if (isFullScreen) {
      return (
        <Button variant="link" size="sm" onClick={() => setFullScreen!(false)}>
          Show Normal View
        </Button>
      );
    } else {
      return (
        <Button variant="link" size="sm" onClick={() => setFullScreen!(true)}>
          Show Full Screen
        </Button>
      );
    }
  }, [allowFullScreenOption, isFullScreen, setFullScreen]);

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

  if (allowFullScreenOption && !setFullScreen) {
    // TODO error box
    return <div>Error loading editor component; bad configuration.</div>;
  }

  // TODO tutorial

  const plugiList = getPluginList();
  const commandList = getCommandsList();

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
          previewOptions={{ remarkPlugins: plugiList }}
        />

        <Button
          variant="link"
          size="sm"
          onClick={() => {
            setShowMDTutorial(true);
          }}
        >
          Markdown Help
        </Button>

        {fsButton}

        <Button variant="link" size="sm" onClick={handleHTMLDownload}>
          Export HTML
        </Button>
      </div>

      {!isFullScreen && (
        <>
          <div className="d-grid gap-2">
            <Button size="sm" variant="outline-secondary" onClick={reversePreviewState()}>
              {showPreviewState ? 'Hide Preview' : 'Show Preview'}
            </Button>

            {showPreviewState && <MDViewer content={content} />}
          </div>
        </>
      )}

      <div>TODO markdown tutorial</div>
    </div>
  );
};
