import React, { ChangeEvent, useCallback, useMemo, useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import fileDownload from 'js-file-download';
import { ClientSideErrorLoading } from '../loading';
import { MarkdownTutorial } from '../markdown/tutorial/MarkdownTutorial';
import { MarkedMDPreview } from './MarkedMDPreview';
import {
  BookFill,
  BookHalf,
  FileRichtextFill,
  Link45deg,
  ListOl,
  ListUl,
  Quote,
  TypeBold,
  TypeH1,
  TypeH2,
  TypeH3,
  TypeItalic,
} from 'react-bootstrap-icons';
import {
  TextState,
  TextAreaTextApi,
  MDToolbar,
  getStateFromTextArea,
  renderedOutputFromMarkdown,
  selectWord,
} from '../../../helpers/markdown';

const replaceTextWith = (
  state: TextState,
  api: TextAreaTextApi,
  token: string,
  endToken: string | undefined = undefined,
  defaultText: string | undefined = undefined
): void => {
  const closingToken = endToken ? endToken : token;
  let newText = '';
  if (defaultText) {
    newText = defaultText;
  }
  if (state.selectedText.length > 0) {
    newText = state.selectedText;
  }
  const newSelectionRange = selectWord({ text: state.text, selection: state.selection });
  const state1 = api.setSelectionRange(newSelectionRange);
  const modifyText = token + newText + closingToken;
  const state2 = api.replaceSelection(modifyText);

  api.setSelectionRange({
    start: state2.selection.end - closingToken.length - state1.selectedText.length,
    end: state2.selection.end - closingToken.length,
  });
};

const toolbar: MDToolbar = {
  buttonGroups: [
    {
      buttons: [
        {
          name: 'Bold',
          keyboardShortcut: 'ctrl+shift+B',
          buttonContents: <TypeBold />,
          execute(state, api) {
            replaceTextWith(state, api, '**');
          },
        },
        {
          name: 'Italics',
          keyboardShortcut: 'ctrl+shift+L',
          buttonContents: <TypeItalic />,
          execute(state, api) {
            replaceTextWith(state, api, '*');
          },
        },
        {
          name: 'H1',
          buttonContents: <TypeH1 />,
          execute(state, api) {
            replaceTextWith(state, api, '# ', ' ', 'HEADING');
          },
        },
        {
          name: 'H2',
          buttonContents: <TypeH2 />,
          execute(state, api) {
            replaceTextWith(state, api, '## ', ' ', 'HEADING');
          },
        },
        {
          name: 'H3',
          buttonContents: <TypeH3 />,
          execute(state, api) {
            replaceTextWith(state, api, '### ', ' ', 'HEADING');
          },
        },
      ],
    },
    {
      buttons: [
        {
          name: 'Link',
          buttonContents: <Link45deg />,
          execute(state, api) {
            const linkURL = prompt('Please enter the URL:');
            if (!linkURL) {
              return;
            }

            const modifyText = `[${state.selectedText}](${linkURL})`;
            api.replaceSelection(modifyText);
          },
        },
        {
          name: 'Quote',
          buttonContents: <Quote />,
          execute(state, api) {
            replaceTextWith(state, api, '> ', ' ', 'QUOTE');
          },
        },
      ],
    },
    {
      buttons: [
        {
          name: 'Bullets',
          buttonContents: <ListUl />,
          execute(state, api) {
            replaceTextWith(state, api, '* ', ' ');
          },
        },
        {
          name: 'Numbered List',
          buttonContents: <ListOl />,
          execute(state, api) {
            replaceTextWith(state, api, '1. ', ' ');
          },
        },
      ],
    },
    {
      buttons: [
        {
          name: 'Highlight',
          buttonContents: <mark>abc</mark>,
          execute(state, api) {
            replaceTextWith(state, api, '==', '==', 'HIGHLIGHT');
          },
        },
        {
          name: 'Superscript',
          buttonContents: (
            <span>
              2<sup>2</sup>
            </span>
          ),
          execute(state, api) {
            replaceTextWith(state, api, '^');
          },
        },
        {
          name: 'All Upper',
          keyboardShortcut: 'ctrl+shift+U',
          buttonContents: (
            <b>
              L<span style={{ fontVariant: 'small-caps' }}>ord</span>
            </b>
          ),
          execute(state, api) {
            replaceTextWith(state, api, '^^^', '^^^', 'LORD');
          },
        },
        {
          name: 'SmallCaps',
          buttonContents: <span style={{ fontVariant: 'small-caps' }}>SmCa</span>,
          execute(state, api) {
            replaceTextWith(state, api, '^-^');
          },
        },
        {
          name: 'Era',
          buttonContents: <span style={{ fontVariant: 'small-caps' }}>b.c.</span>,
          execute(state, api) {
            replaceTextWith(state, api, '^^');
          },
        },
      ],
    },
    {
      buttons: [
        {
          name: 'Scripture Link',
          keyboardShortcut: 'ctrl+shift+S',
          buttonContents: (
            <>
              <BookHalf />
              <Link45deg />
            </>
          ),
          execute(state, api) {
            replaceTextWith(state, api, '[|', '|]', 'REF');
          },
        },
        {
          name: 'Custom Scripture Link',
          keyboardShortcut: 'ctrl+alt+S',
          buttonContents: (
            <>
              <BookFill />
              <Link45deg />
            </>
          ),
          execute(state, api) {
            const customText = prompt('Enter the custom text for this link:');
            const modifyText = `[|${state.selectedText || 'REF'} (${customText})|]`;
            api.replaceSelection(modifyText);
          },
        },
        {
          name: 'Scripture Quotation',
          keyboardShortcut: 'ctrl+shift+P',
          buttonContents: <FileRichtextFill />,
          execute(state, api) {
            prompt('scripture quote button pressed');
          },
        },
      ],
    },
  ],
};

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
  const editorRef = useRef<HTMLTextAreaElement>(null);
  // const windowSize = useWindowSize();

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
          {!hideAllControls && showToolbar && renderedToolbar}

          <Form.Control
            ref={editorRef}
            className="ds-md-editor"
            as="textarea"
            rows={25}
            value={content}
            onChange={handleChangeEvent}
          />
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
