import { RefObject } from 'react';
import {
  TextState,
  TextAreaTextApi,
  selectWord,
  MDToolbar,
  getBreaksNeededForEmptyLineAfter,
  getBreaksNeededForEmptyLineBefore,
  getStateFromTextArea,
} from '../../../../helpers/markdown';
import {
  TypeBold,
  TypeItalic,
  TypeH1,
  TypeH2,
  TypeH3,
  Link45deg,
  Quote,
  ListOl,
  ListUl,
  BookHalf,
  FileRichtextFill,
  BookFill,
} from 'react-bootstrap-icons';

/**
 * Helper function to surround some text in a text area with token(s). If text
 * is selected in the textarea it will be surrounded with the tokens and the
 * cursor will be left in a comfortable spot; if no text is selected some
 * default text can be supplied. If no text is selected and no default
 * text is supplied, the tokens are simply inserted at the cursor location.
 *
 * @param state The `TextState` object represenging the textarea's state
 * @param api The `TextAreaTextApi` class for working with the textarea
 * @param token The token to be inserted before (and maybe after) the text
 * @param endToken Optional: the token to be inserted after the text. If not supplied, `token` is used in both places.
 * @param defaultText Text that should be inserted if none is selected in the textarea.
 */
const replaceTextWith = (
  state: TextState,
  api: TextAreaTextApi,
  token: string,
  endToken: string | undefined = undefined,
  defaultText: string | undefined = undefined
): void => {
  const closingToken = endToken ? endToken : token;
  let newText = defaultText ? defaultText : '';
  if (state.selectedText.length > 0) {
    newText = state.selectedText;
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

/**
 * Helper function to take a `RefObject` reference to a textarea and get objects from it
 * for state and the TextAreaTextApi.
 *
 * @param ta TextArea ref object
 * @returns Tuple including `TextState` object and `TextAreaTextApi` object for the textarea
 */
const getObjectsFromTextarea = (ta: RefObject<HTMLTextAreaElement>): [TextState, TextAreaTextApi] => {
  const state = getStateFromTextArea(ta.current!);
  const api = new TextAreaTextApi(ta.current!);

  return [state, api];
};

/**
 * The buttons to be rendered into the MDEditors toolbar in the format:
 *
 * * name: The name of the item (not used for anything)
 * * keyboardShortcut (optional): Keyboard shortcut to activate this command
 * * buttonContents: The content/UI to be shown in the button; typically an icon
 * * execute: The function to call when the button is clicked.
 */
export const toolbar: MDToolbar = {
  buttonGroups: [
    {
      buttons: [
        {
          name: 'Bold',
          keyboardShortcut: 'ctrl+b',
          buttonContents: <TypeBold />,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            console.log(`selected text for Bold: '${state.selectedText}'; api: `, api);
            replaceTextWith(state, api, '**');
          },
        },
        {
          name: 'Italics',
          keyboardShortcut: 'ctrl+i',
          buttonContents: <TypeItalic />,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            console.log(`selected text for Italics: '${state.selectedText}'; api: `, api);
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
          keyboardShortcut: 'ctrl+shift+k',
          buttonContents: <Link45deg />,
          execute(ta) {
            const linkURL = prompt('Please enter the URL:');
            if (!linkURL) {
              return;
            }

            const [state, api] = getObjectsFromTextarea(ta);
            console.log(`selected text for Link: '${state.selectedText}'; api: `, api);
            const modifyText = `[${state.selectedText}](${linkURL})`;
            api.replaceSelection(modifyText);
          },
        },
        {
          name: 'Quote',
          keyboardShortcut: 'ctrl+q',
          buttonContents: <Quote />,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            console.log(`selected text for Quote: '${state.selectedText}'; api: `, api);
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
          name: 'Highlight',
          keyboardShortcut: 'ctrl+shift+H',
          buttonContents: <mark>abc</mark>,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            console.log(`selected text for Highlight: '${state.selectedText}'; api: `, api);
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
          keyboardShortcut: 'alt+u',
          buttonContents: (
            <b>
              L<span style={{ fontVariant: 'small-caps' }}>ord</span>
            </b>
          ),
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            console.log(`selected text for All Upper: '${state.selectedText}'; api: `, api);
            replaceTextWith(state, api, '^^^', '^^^', 'LORD');
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
            replaceTextWith(state, api, '^^');
          },
        },
      ],
    },
    {
      buttons: [
        {
          name: 'Scripture Link',
          keyboardShortcut: 'ctrl+shift+s',
          buttonContents: (
            <>
              <BookHalf />
              <Link45deg />
            </>
          ),
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            console.log(`selected text for Scripture Link: '${state.selectedText}'; api: `, api);
            replaceTextWith(state, api, '[|', '|]', 'REF');
          },
        },
        {
          name: 'Custom Scripture Link',
          keyboardShortcut: 'alt+s',
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
            console.log(`selected text for Custom Scripture Link: '${state.selectedText}'; api: `, api);
            const modifyText = `[|${state.selectedText || 'REF'} (${customText})|]`;
            api.replaceSelection(modifyText);
          },
        },
        {
          name: 'Scripture Quotation',
          keyboardShortcut: 'ctrl+shift+P',
          buttonContents: <FileRichtextFill />,
          execute(ta) {
            const [state, api] = getObjectsFromTextarea(ta);
            console.log(`selected text for Scripture Quotation: '${state.selectedText}'; api: `, api);
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
