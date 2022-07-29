import {
  ICommand,
  TextState,
  TextAreaTextApi,
  selectWord,
  getBreaksNeededForEmptyLineBefore,
  getBreaksNeededForEmptyLineAfter,
  commands,
} from '@uiw/react-md-editor';
import { BookFill, BookHalf, FileRichtextFill, Link45deg } from 'react-bootstrap-icons';

/**
 * Helper function to take the selected text in the MD Editor, surround
 * it with tokens, and properly set the cursor in the result.
 *
 * In cases where no text is selected, `defaultString` will be used
 * instead.
 *
 * If no `closingToken` is provided, `token` is used for both the
 * open and close token; when both are provided it is assumed they are
 * the same length (results will be unpredictable otherwise).
 *
 * @param initialState Initial text state from MDEditor
 * @param api Text API from MDEditor
 * @param defaultString String to be inserted into the MD if there is no current selection
 * @param token Token with which to surround the string
 * @param closingToken Closing token (optional; if different from opening token)
 */
const surroundWithTokens = (
  initialState: TextState,
  api: TextAreaTextApi,
  defaultString: string,
  token: string,
  closingToken?: string
) => {
  const newSelectionRange = selectWord({ text: initialState.text, selection: initialState.selection });
  const state1 = api.setSelectionRange(newSelectionRange);

  const selectedText = initialState.selectedText ? initialState.selectedText : defaultString;

  const modifyText = token + selectedText + (closingToken ? closingToken : token);
  const state2 = api.replaceSelection(modifyText);

  api.setSelectionRange({
    start: state2.selection.end - token.length - state1.selectedText.length,
    end: state2.selection.end - token.length,
  });
};

const fullCapsCommand: ICommand = {
  name: 'FullCaps',
  keyCommand: 'FullCaps',
  buttonProps: { 'aria-label': 'Insert ALL CAPS', title: 'ALL CAPS' },
  icon: (
    <>
      <b>L</b>
      <b style={{ fontVariant: 'small-caps' }}>ORD</b>
    </>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    surroundWithTokens(state, api, 'LORD', '^^^');
  },
};

const smallFullCapsCommand: ICommand = {
  name: 'SmallFullCaps',
  keyCommand: 'SmallFullCaps',
  buttonProps: { 'aria-label': 'Insert SMALL FULL CAPS', title: 'SMALL FULL CAPS' },
  icon: <b style={{ fontVariant: 'small-caps', textTransform: 'lowercase', display: 'inline-block' }}>A.D.</b>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    surroundWithTokens(state, api, 'A.D.', '^^');
  },
};

const scStyleCommand: ICommand = {
  name: 'SmallCaps',
  keyCommand: 'SmallCaps',
  buttonProps: { 'aria-label': 'Small Caps', title: 'Small Caps' },
  icon: <span style={{ fontVariant: 'small-caps' }}>SmCa</span>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    surroundWithTokens(state, api, '', '^-^');
  },
};

const superCommand: ICommand = {
  name: 'Superscript',
  keyCommand: 'Superscript',
  buttonProps: { 'aria-label': 'Superscript', title: 'Superscript' },
  icon: (
    <b>
      2<sup>2</sup>
    </b>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    surroundWithTokens(state, api, '', '^');
  },
};

const highlightCommand: ICommand = {
  name: 'Highlight',
  keyCommand: 'Highlight',
  shortcuts: 'ctrl+shift+h',
  buttonProps: { 'aria-label': 'Highlight', title: 'Highlight (Ctrl+Shift+H)' },
  icon: <mark>abc</mark>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    surroundWithTokens(state, api, '', '==');
  },
};

const bibleLinkCommand: ICommand = {
  name: 'BibleLink',
  keyCommand: 'BibleLink',
  shortcuts: 'ctrl+shift+s',
  buttonProps: { 'aria-label': 'Scripture Link', title: 'Scripture Link (Ctrl+Shift+S)' },
  icon: (
    <span>
      <BookHalf />
      <Link45deg />
    </span>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    surroundWithTokens(state, api, 'REF', '[|', '|]');
  },
};

const bibleCustomLinkCommand: ICommand = {
  name: 'BibleCustomLink',
  keyCommand: 'BibleCustomLink',
  shortcuts: 'ctrl+alt+s',
  buttonProps: { 'aria-label': 'Scripture Custom Link', title: 'Scripture Custom Link (Ctrl+Alt+S)' },
  icon: (
    <span>
      <BookFill />
      <Link45deg />
    </span>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    const customText = prompt('Enter the text you want to use:');
    if (!customText) {
      return;
    }

    const newSelectedText = state.selectedText ? state.selectedText : 'REF';
    const modifyText = `[|${newSelectedText} (${customText})|]`;
    api.replaceSelection(modifyText);
  },
};

const capitalizedWordsRE = /\b([\p{Lu}\p{Lt}]{2,})\b/gu;
const eraRE = /[\d\s]((?:A\.D\.)|(?:B\.C\.(?:E\.)?)|(?:C\.E\.))/g;

const scriptureQuoteCommand: ICommand = {
  name: 'ScriptureQuote',
  keyCommand: 'ScriptureQuote',
  shortcuts: 'ctrl+shift+p',
  buttonProps: { 'aria-label': 'Scripture Quotation', title: 'Scripture Quotation (Ctrl+Shift+P)' },
  icon: <FileRichtextFill />,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const selectedText = state.selectedText ? state.selectedText : 'QUOTE HERE';
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
    newText = newText.replaceAll(eraRE, '^^$1^^');
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
};

/**
 * Helper function to get the custom commands (and separators) that
 * should be shown in the editor's toolbar.
 *
 * @returns Array of `ICommand` objects
 */
export const getCommandsList = () => {
  return [
    highlightCommand,
    superCommand,
    scStyleCommand,
    commands.divider,
    fullCapsCommand,
    smallFullCapsCommand,
    commands.divider,
    bibleLinkCommand,
    bibleCustomLinkCommand,
    scriptureQuoteCommand,
  ];
};
