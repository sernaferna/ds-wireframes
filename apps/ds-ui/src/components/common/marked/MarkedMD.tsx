import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { renderedOutputFromMarkdown } from '../../../helpers/markdown/markdown-utils';
import { useWindowSize } from '../../../hooks/WindowSize';
import fileDownload from 'js-file-download';
import { ClientSideErrorLoading } from '../loading';
import { MarkdownTutorial } from '../markdown/tutorial/MarkdownTutorial';
import { MarkedMDPreview } from './MarkedMDPreview';

interface IMarkedMD {
  content: string;
  changeCallback: (newContent: string) => void;
  showToolbar?: boolean;
  showSidePreview?: boolean;
  fullScreenOption?: boolean;
  showingFullScreen?: boolean;
  setFullSreen?: (fs: boolean) => void;
  hideAllControls?: boolean;
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
}: IMarkedMD) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
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

  const reversePreviewState = () => {
    return () => {
      setShowPreview(!showPreview);
    };
  };

  const handleChangeEvent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    changeCallback(event.currentTarget.value || '');
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
    <Container fluid>
      <Row>
        <Col xs={showSidePreview ? '6' : '12'}>
          <div>TOOLBAR</div>
          <Form.Control className="ds-md-editor" as="textarea" rows={25} value={content} onChange={handleChangeEvent} />
        </Col>
        {showSidePreview && (
          <Col xs="6">
            <MarkedMDPreview content={content} shaded={false} />
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

            {showPreview && <MarkedMDPreview content={content} shaded={true} />}
          </Col>
        </Row>
      )}

      <MarkdownTutorial show={showTutorial} handleClose={() => setShowTutorial(false)} />
    </Container>
  );
};

const InternalMarkedMD = Object.assign(MarkedMD, {
  Preview: MarkedMDPreview,
});

export { InternalMarkedMD as MarkedMD };
