import React, { useCallback, useMemo, useState, useRef, KeyboardEvent } from 'react';
import { Row, Col, Form, Button, ButtonToolbar, ButtonGroup, Modal } from 'react-bootstrap';
import fileDownload from 'js-file-download';
import { MDPreview } from './MDPreview';
import { outputFromMD } from '../helpers/markdown';
import { useWindowSize } from '../hooks/WindowSize';
import { toolbar } from '../helpers/markdown/md-commands';
import { HotKeys, configure as hotkeyConfigure, KeyMap } from 'react-hotkeys';
import { FullScreenButton } from './helpers/FullScreenButton';

const PREVIEW_DELAY = 500;

export interface IMarkedMD {
  content: string;
  defaultVersion?: string;
  passageContext?: string;
  changeCallback: (newContent: string) => void;
  showToolbar?: boolean;
  fullScreenOption?: boolean;
  fullScreenTitle?: string;
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
 * @param content The markdown to be displayed
 * @param defaultVersion (optional) Default Bible version to use for links
 * @param passageContext (optional) Larger contextual passage to use for relative passages (e.g. `verse 1`)
 * @param changeCallback Callback function to be called when the content is updated
 * @param showToolbar Whether the toolbar should be displayed
 * @param fullScreenOption Whether the component should allow the user to switch to fullscreen mode
 * @param fullScreenTitle: (optional) Title to show in the Full Screen view
 * @param hideAllControls Hides all chrome (toolbar, previews, save HTML, etc.)
 * @param height Height of the editor, in terms of lines to display in the textarea (*not* pixels)
 * @param readOnly If the component should be rendered readonly
 */
export const MarkdownBox = ({
  content,
  defaultVersion,
  passageContext,
  changeCallback,
  showToolbar = true,
  fullScreenOption = false,
  fullScreenTitle,
  hideAllControls = false,
  height = 20,
  readOnly = false,
}: IMarkedMD) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  //   const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [preventScrollEvent, setPreventScrollEvent] = useState<boolean>(false);
  const [viewerLastScroll, setViewerLastScroll] = useState(0);
  const windowSize = useWindowSize();
  const [previewContent, setPreviewContent] = useState(content);
  const [previewTimer, setPreviewTimer] = useState<NodeJS.Timer | null>(null);
  const [fs, setFS] = useState<boolean>(false);

  const editorLineHeight = useMemo(() => {
    if (!editorRef.current || !fs) {
      return height;
    }

    const fontHeight = parseFloat(getComputedStyle(editorRef.current!).fontSize);
    const newHeight = windowSize.height / fontHeight / 2;

    return newHeight;
  }, [editorRef, windowSize, height, fs]);

  const getEditorPixelHeight = () => {
    if (!editorRef.current) return 0;

    return editorRef.current.clientHeight;
  };

  const getToolbarPixelHeight = () => {
    if (!toolbarRef.current) return 0;

    return toolbarRef.current.clientHeight;
  };

  const reversePreviewState = () => {
    return () => {
      setShowPreview(!showPreview);
    };
  };

  const handleHTMLDownload = useCallback(() => {
    const formattedHTML = outputFromMD(content, defaultVersion, passageContext);
    fileDownload(formattedHTML, 'notes.html');
  }, [content, defaultVersion, passageContext]);

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

    const renderedToolbar = toolbar.buttonGroups.map((g, index) => (
      <ButtonGroup size="sm" key={`buttongroup-${index}`}>
        {g.buttons.map((b, buttonIndex) => {
          const clickFn = () => {
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
    ));

    return [renderedToolbar, keyMap, handlers];
  }, [editorRef]);

  hotkeyConfigure({
    ignoreTags: [],
    ignoreEventsCondition: () => false,
    stopEventPropagationAfterHandling: true,
    simulateMissingKeyPressEvents: false,
    ignoreKeymapAndHandlerChangesByDefault: false,
  });

  return (
    <>
      {!fs && (
        <Row>
          <Col>
            <ButtonToolbar
              ref={toolbarRef}
              aria-label="Markdown Toolbar"
              className={hideAllControls || !showToolbar ? 'd-none' : ''}
            >
              {renderedToolbar}
            </ButtonToolbar>

            <HotKeys keyMap={keyMap} handlers={handlers} allowChanges={false}>
              <Form.Control
                ref={editorRef}
                className="ds-md-editor"
                as="textarea"
                rows={editorLineHeight}
                value={content}
                onChange={(newValue) => {
                  const newText = newValue.currentTarget.value;
                  changeCallback(newText);

                  if (previewTimer) {
                    clearTimeout(previewTimer);
                  }

                  setPreviewTimer(
                    setTimeout(() => {
                      setPreviewContent(newText);
                      setPreviewTimer(null);
                    }, PREVIEW_DELAY)
                  );
                }}
                disabled={readOnly}
                onScroll={handleEditorScroll}
              />
            </HotKeys>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          {/* {!hideAllControls && (
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setShowTutorial(true);
              }}
            >
              Show Tutorial
            </Button>
          )} */}

          {fullScreenOption && <FullScreenButton isFullScreen={fs} stateSetter={setFS} />}

          {!hideAllControls && (
            <Button variant="link" size="sm" onClick={handleHTMLDownload}>
              Export HTML
            </Button>
          )}
        </Col>
      </Row>
      {!fs && !hideAllControls && (
        <Row>
          <Col className="d-grid gap-2">
            <Button size="sm" variant="outline-secondary" onClick={reversePreviewState()}>
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>

            {showPreview && (
              <MDPreview
                content={previewContent}
                shaded={true}
                defaultVersion={defaultVersion}
                passageContext={passageContext}
              />
            )}
          </Col>
        </Row>
      )}

      {fs && (
        <Modal show={true} onHide={() => setFS(false)} keyboard={false} fullscreen>
          {fullScreenTitle && (
            <Modal.Header closeButton>
              <Modal.Title>{fullScreenTitle}</Modal.Title>
            </Modal.Header>
          )}
          <Modal.Body>
            <Row>
              <Col xs="6">
                <ButtonToolbar
                  ref={toolbarRef}
                  aria-label="Markdown Toolbar"
                  className={hideAllControls || !showToolbar ? 'd-none' : ''}
                >
                  {renderedToolbar}
                </ButtonToolbar>

                <HotKeys keyMap={keyMap} handlers={handlers} allowChanges={false}>
                  <Form.Control
                    ref={editorRef}
                    className="ds-md-editor"
                    as="textarea"
                    rows={editorLineHeight}
                    value={content}
                    onChange={(newValue) => {
                      const newText = newValue.currentTarget.value;
                      changeCallback(newText);

                      if (previewTimer) {
                        clearTimeout(previewTimer);
                      }

                      setPreviewTimer(
                        setTimeout(() => {
                          setPreviewContent(newText);
                          setPreviewTimer(null);
                        }, PREVIEW_DELAY)
                      );
                    }}
                    disabled={readOnly}
                    onScroll={handleEditorScroll}
                  />
                </HotKeys>
              </Col>
              <Col xs="6">
                <div style={{ height: `${getToolbarPixelHeight()}px` }}>&nbsp;</div>
                <div
                  ref={viewerRef}
                  className="overflow-auto"
                  onScroll={handleViewerScroll}
                  style={{ height: `${getEditorPixelHeight()}px` }}
                >
                  <MDPreview
                    content={previewContent}
                    shaded={false}
                    defaultVersion={defaultVersion}
                    passageContext={passageContext}
                  />
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setFS(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
