import {
  ICommand,
  TextState,
  TextAreaTextApi,
  selectWord,
  getBreaksNeededForEmptyLineBefore,
  getBreaksNeededForEmptyLineAfter,
  commands,
} from '@uiw/react-md-editor';
import {
  poetryBlocks,
  tac,
  lowerCaps,
  smallCaps,
  smartquotes,
  bibleLinks,
  adbcReplacements,
  allCapReplacements,
  highlight,
} from '@devouringscripture/remark-plugins';
import supersub from 'remark-supersub';
import { TextRight } from 'react-bootstrap-icons';

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
  icon: <u>BG✞</u>,
  execute: (state: TextState, api: TextAreaTextApi) => {
    const modifyText = `[|${state.selectedText}|]`;
    api.replaceSelection(modifyText);
  },
};

export const poetryQuoteCommand: ICommand = {
  name: 'PoetryQuote',
  keyCommand: 'PoetryQuote',
  buttonProps: { 'aria-label': 'Biblical Poetry', title: 'Scripture Quotation' },
  icon: <TextRight className="border" />,
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

    //replaces the current selection with the poetry quote mark
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
 * Helper function to return a list of remark plugins to be used in rendering MD to HTML
 *
 * @param autoSmallCap Setting controlling whether uppercase text should be auto Small Caps
 * @param autoADBC Setting controlling whether A.D. / B.C. should be autoformatted
 * @returns List of plugins to be used for formatting MD, in the correct order they should be applied
 */
export const getPluginList = (autoSmallCap: boolean, autoADBC: boolean) => {
  const pluginList = [poetryBlocks, tac, lowerCaps, smallCaps, bibleLinks];
  if (autoADBC) {
    pluginList.push(adbcReplacements);
  }
  if (autoSmallCap) {
    pluginList.push(allCapReplacements);
  }
  pluginList.push(highlight, supersub, smartquotes);

  return pluginList;
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

  commandList.push(scstyleCommand, bibleLinkCommand, poetryQuoteCommand);

  return commandList;
};
