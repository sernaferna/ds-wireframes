import { ICommand, TextState, TextAreaTextApi } from '@uiw/react-md-editor';

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
