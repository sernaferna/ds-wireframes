import React, { RefObject } from 'react';
import {
  TextState,
  TextAreaTextApi,
  selectWord,
  getBreaksNeededForEmptyLineAfter,
  getBreaksNeededForEmptyLineBefore,
  getStateFromTextArea,
} from './TextAreaTextApi';
import {
  TypeBold,
  TypeItalic,
  TypeH1,
  TypeH2,
  TypeH3,
  Link45deg,
  Quote,
  ListUl,
  ListOl,
  BookHalf,
  BookFill,
  FileRichtextFill,
} from 'react-bootstrap-icons';

interface MDToolbarButton {
  name: string;
  keyboardShortcut?: string;
  buttonContents: JSX.Element;
  execute: (tb: RefObject<HTMLTextAreaElement>) => void;
}

interface MDToolbarButtonGroup {
  buttons: MDToolbarButton[];
}

export interface MDToolbar {
  buttonGroups: MDToolbarButtonGroup[];
}

const replaceTextWith = (
  state: TextState,
  api: TextAreaTextApi,
  token: string,
  endToken: string | undefined = undefined,
  defaultText: string | undefined = undefined,
  makeUpper: boolean = false
): void => {
  const closingToken = endToken ? endToken : token;
  let newText = defaultText ? defaultText : '';
  if (state.selectedText.length > 0) {
    newText = state.selectedText;
    if (makeUpper) {
      newText = newText.toLocaleUpperCase();
    }
  }

  const startStartPosition = state.selection.start - token.length;
  const endEndPosition = state.selection.end + closingToken.length;
  const beforeText = state.text.substring(startStartPosition, state.selection.start);
  const afterText = state.text.substring(state.selection.end, endEndPosition);
  if (beforeText === token && afterText === closingToken) {
    const oldSelectedText = state.selectedText;
    api.setSelectionRange({
      start: startStartPosition,
      end: endEndPosition,
    });
    api.replaceSelection(oldSelectedText);
    return;
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

const getObjectsFromTextarea = (ta: RefObject<HTMLTextAreaElement>): [TextState, TextAreaTextApi] => {
  const state = getStateFromTextArea(ta.current!);
  const api = new TextAreaTextApi(ta.current!);

  return [state, api];
};

export const toolbar: MDToolbar = {
  buttonGroups: [
    {
      buttons: [
        {
          name: 'Bold',
          keyboardShortcut: 'Control+b',
          buttonContents: <TypeBold />,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '**');
          },
        },
        {
          name: 'Italics',
          keyboardShortcut: 'Control+i',
          buttonContents: <TypeItalic />,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '*');
          },
        },
        {
          name: 'H1',
          buttonContents: <TypeH1 />,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '# ', ' ', 'HEADING');
          },
        },
        {
          name: 'H2',
          buttonContents: <TypeH2 />,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '## ', ' ', 'HEADING');
          },
        },
        {
          name: 'H3',
          buttonContents: <TypeH3 />,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '### ', ' ', 'HEADING');
          },
        },
      ],
    },
    {
      buttons: [
        {
          name: 'Link',
          keyboardShortcut: 'Control+Shift+k',
          buttonContents: <Link45deg />,
          execute(ta) {
            const linkURL = prompt('Please enter the URL:');
            if (!linkURL) {
              return;
            }

            const [state, api] = getObjectsFromTextarea(ta);
            const modifyText = `[${state.selectedText}](${linkURL})`;
            api.replaceSelection(modifyText);
          },
        },
        {
          name: 'Quote',
          keyboardShortcut: 'Control+q',
          buttonContents: <Quote />,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
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
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '* ', ' ');
          },
        },
        {
          name: 'Numbered List',
          buttonContents: <ListOl />,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '1. ', ' ');
          },
        },
      ],
    },
    {
      buttons: [
        {
          name: 'Double Smart Quotes',
          buttonContents: <span>“a”</span>,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '“', '”');
          },
        },
        {
          name: 'Single Smart Quotes',
          buttonContents: <span>‘a’</span>,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '‘', '’');
          },
        },
        {
          name: 'Highlight',
          keyboardShortcut: 'Control+Shift+H',
          buttonContents: <mark>abc</mark>,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
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
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '^');
          },
        },
        {
          name: 'All Upper',
          keyboardShortcut: 'Alt+u',
          buttonContents: (
            <b>
              L<span style={{ fontVariant: 'small-caps' }}>ord</span>
            </b>
          ),
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '^^^', '^^^', 'LORD', true);
          },
        },
        {
          name: 'SmallCaps',
          buttonContents: <span style={{ fontVariant: 'small-caps' }}>SmCa</span>,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '^-^');
          },
        },
        {
          name: 'Era',
          buttonContents: <span style={{ fontVariant: 'small-caps' }}>b.c.</span>,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '^^', undefined, undefined, true);
          },
        },
      ],
    },
    {
      buttons: [
        {
          name: 'Scripture Link',
          keyboardShortcut: 'Control+Shift+s',
          buttonContents: (
            <>
              <BookHalf />
              <Link45deg />
            </>
          ),
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            replaceTextWith(state, api, '[|', '|]', 'REF');
          },
        },
        {
          name: 'Custom Scripture Link',
          keyboardShortcut: 'Alt+s',
          buttonContents: (
            <>
              <BookFill />
              <Link45deg />
            </>
          ),
          execute(ta) {
            const customText = prompt('Enter the custom text for this link:');
            if (!customText) {
              return;
            }
            const [state, api] = getObjectsFromTextarea(ta);
            const modifyText = `[|${state.selectedText || 'REF'} (${customText})|]`;
            api.replaceSelection(modifyText);
          },
        },
        {
          name: 'Scripture Quotation',
          keyboardShortcut: 'Control+Shift+p',
          buttonContents: <FileRichtextFill />,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            const selectedText = state.selectedText ? state.selectedText : 'QUOTE';
            const newSelectionRange = selectWord({ text: state.text, selection: state.selection });
            const state1 = api.setSelectionRange(newSelectionRange);
            const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(state1.text, state1.selection.start);
            const breaksBefore = Array(breaksBeforeCount + 1).join('\n');

            const breaksAfterCount = getBreaksNeededForEmptyLineAfter(state1.text, state1.selection.end);
            const breaksAfter = Array(breaksAfterCount + 1).join('\n');

            let newText = '|> ' + selectedText.replaceAll('\n', '\n|> ');
            newText = newText.replaceAll('|>  ', '|> |> ');
            newText = newText.replaceAll(/^(\d+)\s/g, ' ^$1^ ');
            newText = newText.replaceAll(/\s(\d+)\s/g, ' ^$1^ ');

            const capitalizedWordsRE = /\b([\p{Lu}\p{Lt}]{2,})\b/gu;
            newText = newText.replaceAll(capitalizedWordsRE, '^^^$1^^^');

            //replaces the current selection with the scripture quote mark
            api.replaceSelection(`${breaksBefore}${newText}${breaksAfter}`);

            const selectionStart = state1.selection.start + breaksBeforeCount + 2;
            const selectionEnd = selectionStart + selectedText.length;

            api.setSelectionRange({
              start: selectionStart,
              end: selectionEnd,
            });
          },
        },
      ],
    },
  ],
};
