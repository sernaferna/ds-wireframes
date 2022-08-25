import React, { useCallback, useMemo, useState, useRef, KeyboardEvent } from 'react';
import { Row, Col, Form, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import fileDownload from 'js-file-download';
import { ClientSideErrorLoading } from '../loading';
import { MarkdownTutorial } from './tutorial/MarkdownTutorial';
import { MDPreview } from './MDPreview';
import { renderedOutputFromMarkdown } from '../../../helpers/markdown';
import { useWindowSize } from '../../../hooks/WindowSize';
import { toolbar } from './helpers/md-commands';
import { HotKeys, configure as hotkeyConfigure, KeyMap } from 'react-hotkeys';

const CALLBACK_INTERVAL = 1000;

interface IMarkedMD {
  content: string;
  changeCallback: (newContent: string) => void;
  showToolbar?: boolean;
  showSidePreview?: boolean;
  fullScreenOption?: boolean;
  showingFullScreen?: boolean;
  setFullSreen?: (fs: boolean) => void;
  hideAllControls?: boolean;
  height?: number;
  readOnly?: boolean;
}

/**
 * Reusable rich-text editing component that uses **markdown**. Rendering
 * handled by **marked**.
 *
 * For smoother UI, the component doesn't immediately report back to the
 * caller when text is modified, as the rendering gets too choppy.
 *
 * There are various forms of chrome (toolbar, preview, side preview, etc.) that
 * can be enabled/disabled. Not all combinations may have been tested together,
 * but some definitely override. e.g. setting `hideAllControls` will hide all
 * of the controls, even if, for example, `showSidePreview` is set to true.
 *
 * Has a callback for indicating to the parent component when the fullscreen status
 * changes, because the parent may neet to adjust its own UI accordingly to
 * accommodate the fullscreen version of this component.
 *
 * @param content The markdown to be displayed
 * @param changeCallback Callback function to be called when the content is updated
 * @param showToolbar Whether the toolbar should be displayed
 * @param showSidePreview Whether the side preview should be displayed
 * @param fullScreenOption Whether the component should allow the user to switch to fullscreen mode
 * @param showingFullScreen Indicates if the component should currently be displayed full screen
 * @param setFullScreen Callback function to call when the full screen indicator changes
 * @param hideAllControls Hides all chrome (toolbar, previews, save HTML, etc.)
 * @param height Height of the editor, in terms of lines to display in the textarea (*not* pixels)
 * @param readOnly If the component should be rendered readonly
 */
const MarkedMD = ({
  content,
  changeCallback,
  showToolbar = true,
  showSidePreview = false,
  fullScreenOption = false,
  showingFullScreen = false,
  setFullSreen = undefined,
  hideAllControls = false,
  height = 20,
  readOnly = false,
}: IMarkedMD) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [preventScrollEvent, setPreventScrollEvent] = useState<boolean>(false);
  const [viewerLastScroll, setViewerLastScroll] = useState(0);
  const windowSize = useWindowSize();
  const [md, setMD] = useState(content);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  const fsButton = useMemo(() => {
    if (!fullScreenOption) {
      return <></>;
    }

    if (showingFullScreen) {
      return (
        <Button variant="link" size="sm" onClick={() => setFullSreen!(false)}>
          Show Normal View
        </Button>
      );
    } else {
      return (
        <Button variant="link" size="sm" onClick={() => setFullSreen!(true)}>
          Show Full Screen
        </Button>
      );
    }
  }, [fullScreenOption, setFullSreen, showingFullScreen]);

  const [editorLineHeight, editorPixelHeight] = useMemo(() => {
    if (!editorRef.current || !showingFullScreen) {
      return [height, 0];
    }

    const pixelHeight = editorContainerRef.current!.clientHeight;

    const fontHeight = parseFloat(getComputedStyle(editorRef.current!).fontSize);
    const newHeight = windowSize.height / fontHeight / 2;

    return [newHeight, pixelHeight];
  }, [editorRef, windowSize, height, showingFullScreen]);

  const reversePreviewState = () => {
    return () => {
      setShowPreview(!showPreview);
    };
  };

  const handleHTMLDownload = useCallback(() => {
    const formattedHTML = renderedOutputFromMarkdown(content);
    fileDownload(formattedHTML, 'notes.html');
  }, [content]);

  const handleEditorScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preventScrollEvent) {
      setPreventScrollEvent(false);
      return;
    }

    setPreventScrollEvent(true);
    if (viewerRef.current) {
      viewerRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleViewerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (preventScrollEvent) {
      setPreventScrollEvent(false);
      return;
    }

    if (e.currentTarget.scrollTop !== viewerLastScroll) {
      setPreventScrollEvent(true);
      if (editorRef.current) {
        editorRef.current.scrollTop = e.currentTarget.scrollTop;
      }
      setViewerLastScroll(e.currentTarget.scrollTop);
    }
  };

  const [renderedToolbar, keyMap, handlers] = useMemo(() => {
    let keyMap: KeyMap = {};
    let handlers = {};

    const renderedToolbar = (
      <ButtonToolbar aria-label="Markdown Toolbar" className={hideAllControls || !showToolbar ? 'd-none' : ''}>
        {toolbar.buttonGroups.map((g, index) => (
          <ButtonGroup size="sm" key={`buttongroup-${index}`}>
            {g.buttons.map((b, buttonIndex) => {
              const clickFn = () => {
                console.log(`${b.name} called`); // TODO remove
                b.execute(editorRef);
              };
              if (b.keyboardShortcut) {
                keyMap = { ...keyMap, [b.name]: b.keyboardShortcut };
                handlers = {
                  ...handlers,
                  [b.name]: (event: KeyboardEvent) => {
                    clickFn();
                    event.preventDefault();
                    event.stopPropagation();
                  },
                };
              }
              const title = b.keyboardShortcut ? `${b.name} (${b.keyboardShortcut})` : b.name;
              return (
                <Button variant="outline-dark" onClick={clickFn} key={`button-${buttonIndex}`} title={title}>
                  {b.buttonContents}
                </Button>
              );
            })}
          </ButtonGroup>
        ))}
      </ButtonToolbar>
    );

    return [renderedToolbar, keyMap, handlers];
  }, [editorRef, hideAllControls, showToolbar]);

  if (fullScreenOption && !setFullSreen) {
    return (
      <ClientSideErrorLoading>
        <p>Error loading page; bad configuration</p>
      </ClientSideErrorLoading>
    );
  }

  hotkeyConfigure({
    ignoreTags: [],
    stopEventPropagationAfterHandling: true,
  });

  return (
    <>
      <Row>
        <Col xs={showSidePreview ? '6' : '12'} ref={editorContainerRef}>
          {renderedToolbar}

          <HotKeys keyMap={keyMap} handlers={handlers} allowChanges={true}>
            <Form.Control
              ref={editorRef}
              className="ds-md-editor"
              as="textarea"
              rows={editorLineHeight}
              value={md}
              onChange={(newValue) => {
                if (timer) {
                  clearTimeout(timer);
                }

                setMD(newValue.currentTarget.value);
                setTimer(
                  setTimeout(() => {
                    changeCallback(md);
                    setTimer(null);
                  }, CALLBACK_INTERVAL)
                );
              }}
              disabled={readOnly}
              onScroll={handleEditorScroll}
            />
          </HotKeys>
        </Col>
        {showSidePreview && (
          <Col ref={viewerRef} xs="6" className="overflow-auto" onScroll={handleViewerScroll}>
            <div style={{ height: `${editorPixelHeight}px` }}>
              <MDPreview content={md} shaded={false} />
            </div>
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          {!hideAllControls && (
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setShowTutorial(true);
              }}
            >
              Show Tutorial
            </Button>
          )}

          {fsButton}

          {!hideAllControls && (
            <Button variant="link" size="sm" onClick={handleHTMLDownload}>
              Export HTML
            </Button>
          )}
        </Col>
      </Row>
      {!showingFullScreen && !hideAllControls && (
        <Row>
          <Col className="d-grid gap-2">
            <Button size="sm" variant="outline-secondary" onClick={reversePreviewState()}>
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>

            {showPreview && <MDPreview content={md} shaded={true} />}
          </Col>
        </Row>
      )}

      <MarkdownTutorial show={showTutorial} handleClose={() => setShowTutorial(false)} />
    </>
  );
};

/**
 * Include the `MDPreview` component into this component's interface,
 * so that it can be included via `<MarkdownBox.Preview>`.
 */
const InternalMarkedMD = Object.assign(MarkedMD, {
  Preview: MDPreview,
});

export { InternalMarkedMD as MarkdownBox };
