import {
  ICommand,
  TextState,
  TextAreaTextApi,
  selectWord,
  getBreaksNeededForEmptyLineBefore,
  getBreaksNeededForEmptyLineAfter,
} from '@uiw/react-md-editor';

export const lordCommand: ICommand = {
  name: 'LORD',
  keyCommand: 'LORD',
  buttonProps: { 'aria-label': 'Insert LORD' },
  icon: (
    <>
      <b>L</b>
      <b style={{ fontVariant: 'small-caps' }}>ord</b>
    </>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `^^^${state.selectedText ? state.selectedText : 'LORD'}^^^`;
    api.replaceSelection(modifyText);
  },
};

export const scCommand: ICommand = {
  name: 'SC',
  keyCommand: 'SC',
  buttonProps: { 'aria-label': 'Insert all SMALL CAPS' },
  icon: <b style={{ fontVariant: 'small-caps', textTransform: 'lowercase', display: 'inline-block' }}>A.D.</b>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `^^${state.selectedText ? state.selectedText : 'A.D.'}^^`;
    api.replaceSelection(modifyText);
  },
};

export const scstyleCommand: ICommand = {
  name: 'SmallCaps',
  keyCommand: 'SmallCaps',
  buttonProps: { 'aria-label': 'Insert Small Caps' },
  icon: <span style={{ fontVariant: 'small-caps' }}>SmCa</span>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `^-^${state.selectedText}^-^`;
    api.replaceSelection(modifyText);
  },
};

export const superCommand: ICommand = {
  name: 'Superscript',
  keyCommand: 'Superscript',
  buttonProps: { 'aria-label': 'Superscript' },
  icon: (
    <b>
      2<sup>2</sup>
    </b>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `^${state.selectedText}^`;
    api.replaceSelection(modifyText);
  },
};

export const highlightCommand: ICommand = {
  name: 'Highlight',
  keyCommand: 'Highlight',
  buttonProps: { 'aria-label': 'Highlight' },
  icon: <mark>abc</mark>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `==${state.selectedText}==`;
    api.replaceSelection(modifyText);
  },
};

export const esvLinkCommand: ICommand = {
  name: 'ESVLink',
  keyCommand: 'ESVLink',
  buttonProps: { 'aria-label': 'Bible link' },
  icon: <u>ESV✞</u>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `[[${state.selectedText}]ESV]`;
    api.replaceSelection(modifyText);
  },
};

export const nivLinkCommand: ICommand = {
  name: 'NIVLink',
  keyCommand: 'NIVLink',
  buttonProps: { 'aria-label': 'Bible link' },
  icon: <u>NIV✞</u>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `[[${state.selectedText}]NIV]`;
    api.replaceSelection(modifyText);
  },
};

export const bibleLinkCommand: ICommand = {
  name: 'BibleLink',
  keyCommand: 'BibleLink',
  buttonProps: { 'aria-label': 'Bible link' },
  icon: <u>BG✞</u>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `[[${state.selectedText}]]`;
    api.replaceSelection(modifyText);
  },
};

export const poetryQuoteCommand: ICommand = {
  name: 'PoetryQuote',
  keyCommand: 'PoetryQuote',
  buttonProps: { 'aria-label': 'Biblical Poetry' },
  icon: (
    <svg width="12" height="12">
      <g>
        <title>Layer 1</title>
        <line id="svg_5" y2="7.02992" x2="11.07632" y1="7.09242" x1="1.01383" stroke="#000" fill="none" />
        <line id="svg_6" y2="8.46742" x2="10.95132" y1="8.46742" x1="3.01383" stroke="#000" fill="none" />
        <line id="svg_7" y2="4.09243" x2="11.07632" y1="4.15493" x1="1.01383" stroke="#000" fill="none" />
        <line id="svg_8" y2="5.52992" x2="10.95132" y1="5.52992" x1="3.01383" stroke="#000" fill="none" />
      </g>
    </svg>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    const selectedText = state.selectedText ? state.selectedText : 'QUOTE';
    const newSelectionRange = selectWord({ text: state.text, selection: state.selection });
    const state1 = api.setSelectionRange(newSelectionRange);
    const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(state1.text, state1.selection.start);
    const breaksBefore = Array(breaksBeforeCount + 1).join('\n');

    const breaksAfterCount = getBreaksNeededForEmptyLineAfter(state1.text, state1.selection.end);
    const breaksAfter = Array(breaksAfterCount + 1).join('\n');

    //replaces the current selection with the poetry quote mark
    api.replaceSelection(`${breaksBefore}|>${' '}${selectedText}${breaksAfter}`);

    const selectionStart = state1.selection.start + breaksBeforeCount + 2;
    const selectionEnd = selectionStart + selectedText.length;

    api.setSelectionRange({
      start: selectionStart,
      end: selectionEnd,
    });
  },
};
