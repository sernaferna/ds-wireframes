import {
  ICommand,
  TextState,
  TextAreaTextApi,
  selectWord,
  getBreaksNeededForEmptyLineBefore,
  getBreaksNeededForEmptyLineAfter,
  commands,
} from '@uiw/react-md-editor';
import { TextRight, BookHalf, BookFill, Link45deg, FileRichtextFill } from 'react-bootstrap-icons';

export const lordCommand: ICommand = {
  name: 'LORD',
  keyCommand: 'LORD',
  buttonProps: { 'aria-label': 'Insert LORD', title: 'ALL CAPS' },
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
  buttonProps: { 'aria-label': 'Insert all SMALL CAPS', title: 'Insert all SMALL CAPS' },
  icon: <b style={{ fontVariant: 'small-caps', textTransform: 'lowercase', display: 'inline-block' }}>A.D.</b>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `^^${state.selectedText ? state.selectedText : 'A.D.'}^^`;
    api.replaceSelection(modifyText);
  },
};

export const scstyleCommand: ICommand = {
  name: 'SmallCaps',
  keyCommand: 'SmallCaps',
  buttonProps: { 'aria-label': 'Insert Small Caps', title: 'Small Caps' },
  icon: <span style={{ fontVariant: 'small-caps' }}>SmCa</span>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `^-^${state.selectedText}^-^`;
    api.replaceSelection(modifyText);
  },
};

export const superCommand: ICommand = {
  name: 'Superscript',
  keyCommand: 'Superscript',
  buttonProps: { 'aria-label': 'Superscript', title: 'Superscript' },
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
  buttonProps: { 'aria-label': 'Highlight', title: 'Highlight' },
  icon: <mark>abc</mark>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `==${state.selectedText}==`;
    api.replaceSelection(modifyText);
  },
};

export const esvLinkCommand: ICommand = {
  name: 'ESVLink',
  keyCommand: 'ESVLink',
  buttonProps: { 'aria-label': 'Bible link', title: 'ESV Bible Link' },
  icon: <u>ESV✞</u>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `[|${state.selectedText}|ESV]`;
    api.replaceSelection(modifyText);
  },
};

export const nivLinkCommand: ICommand = {
  name: 'NIVLink',
  keyCommand: 'NIVLink',
  buttonProps: { 'aria-label': 'Bible link', title: 'NIV Bible Link' },
  icon: <u>NIV✞</u>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `[|${state.selectedText}|NIV]`;
    api.replaceSelection(modifyText);
  },
};

export const bibleLinkCommand: ICommand = {
  name: 'BibleLink',
  keyCommand: 'BibleLink',
  buttonProps: { 'aria-label': 'Bible link', title: 'Insert Bible Link' },
  icon: (
    <span>
      <BookHalf />
      <Link45deg />
    </span>
  ),
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `[|${state.selectedText}|]`;
    api.replaceSelection(modifyText);
  },
};

export const bibleCustomLinkCommand: ICommand = {
  name: 'BibleCustomLink',
  keyCommand: 'BibleCustomLink',
  buttonProps: { 'aria-label': 'Bible Link', title: 'Insert Bible Link with custom text' },
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

    const modifyText = `[|${state.selectedText} (${customText})|]`;
    api.replaceSelection(modifyText);
  },
};

export const scriptureQuoteCommand: ICommand = {
  name: 'ScriptureQuotation',
  keyCommand: 'ScriptureQuotation',
  buttonProps: { 'aria-label': 'Scripture Quotation', title: 'Scripture Quotation' },
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
    newText = newText.replaceAll(/^(\d+)\s/g, ' ^$1^');
    newText = newText.replaceAll(/\s(\d+)\s/g, ' ^$1^');

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
 * Helper function to get a list of commands to show in the MD Editor toolbar
 *
 * @param autoSmallCap Indicates whether small caps are automatically being converted (in which case the commmand won't show)
 * @param autoADBC Indicates whether A.D./B.C./B.C.E. are automatically being converted (in which case the command won't show)
 * @returns List of commands to show in the MD editor toolbar
 */
export const getCommandList = (autoSmallCap: boolean, autoADBC: boolean): ICommand[] => {
  const commandList: ICommand[] = [highlightCommand, superCommand, commands.divider];

  if (!autoSmallCap) {
    commandList.push(lordCommand);
  }
  if (!autoADBC) {
    commandList.push(scCommand);
  }

  commandList.push(scstyleCommand, bibleLinkCommand, bibleCustomLinkCommand, scriptureQuoteCommand);

  return commandList;
};
