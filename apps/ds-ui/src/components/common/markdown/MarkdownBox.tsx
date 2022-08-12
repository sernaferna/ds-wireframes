import React, { ChangeEvent, useCallback, useMemo, useState, useRef } from 'react';
import { Row, Col, Form, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import fileDownload from 'js-file-download';
import { ClientSideErrorLoading } from '../loading';
import { MarkdownTutorial } from './tutorial/MarkdownTutorial';
import { MDPreview } from './MDPreview';
import { TextAreaTextApi, getStateFromTextArea, renderedOutputFromMarkdown } from '../../../helpers/markdown';
import { useWindowSize } from '../../../hooks/WindowSize';
import { toolbar } from './helpers/md-commands';

const AUTOSAVE_INTERVAL = 3000;

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
  const [md, setMD] = useState(content);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const windowSize = useWindowSize();

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

    const pixelHeight = editorRef.current!.style.height;

    const fontHeight = parseFloat(getComputedStyle(editorRef.current!).fontSize);
    const newHeight = windowSize.height / fontHeight / 2;

    return [newHeight, pixelHeight];
  }, [editorRef, windowSize, height, showingFullScreen]);

  const renderedToolbar: JSX.Element = useMemo(() => {
    return (
      <ButtonToolbar aria-label="Markdown Toolbar">
        {toolbar.buttonGroups.map((g, index) => (
          <ButtonGroup size="sm" key={`buttongroup-${index}`}>
            {g.buttons.map((b, buttonIndex) => (
              <Button
                variant="outline-dark"
                onClick={() => {
                  const state = getStateFromTextArea(editorRef.current!);
                  const api = new TextAreaTextApi(editorRef.current!);
                  b.execute(state, api);
                }}
                key={`button-${buttonIndex}`}
              >
                {b.buttonContents}
              </Button>
            ))}
          </ButtonGroup>
        ))}
      </ButtonToolbar>
    );
  }, [editorRef]);

  const reversePreviewState = () => {
    return () => {
      setShowPreview(!showPreview);
    };
  };

  const sendBackData = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    changeCallback(md);
  };

  const handleChangeEvent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (timer) {
      clearTimeout(timer);
    }

    setMD(event.currentTarget.value || '');
    setTimer(setTimeout(sendBackData, AUTOSAVE_INTERVAL));
  };

  const handleHTMLDownload = useCallback(() => {
    const formattedHTML = renderedOutputFromMarkdown(content);
    fileDownload(formattedHTML, 'notes.html');
  }, [content]);

  if (fullScreenOption && !setFullSreen) {
    return (
      <ClientSideErrorLoading>
        <p>Error loading page; bad configuration</p>
      </ClientSideErrorLoading>
    );
  }

  return (
    <>
      <Row>
        <Col xs={showSidePreview ? '6' : '12'}>
          {!hideAllControls && showToolbar && renderedToolbar}

          <Form.Control
            ref={editorRef}
            className="ds-md-editor"
            as="textarea"
            rows={editorLineHeight}
            value={md}
            onChange={handleChangeEvent}
            disabled={readOnly}
          />
        </Col>
        {showSidePreview && (
          <Col xs="6" className="overflow-auto">
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

const InternalMarkedMD = Object.assign(MarkedMD, {
  Preview: MDPreview,
});

export { InternalMarkedMD as MarkdownBox };
