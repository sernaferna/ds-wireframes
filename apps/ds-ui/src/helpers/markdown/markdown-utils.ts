import { marked } from 'marked';
import { allUpperExtension } from './extensions/allUpperExtension';
import { highlightExtension } from './extensions/highlightExtension';
import { smallCapsExtension } from './extensions/smallCapsExtension';
import { eraExtension } from './extensions/eraExtension';
import { bibleLinkExtension } from './extensions/bibleLinkExtension';
import { scriptureQuotesExtension } from './extensions/scriptureQuotes';
import { superscriptExtension } from './extensions/superscriptExtension';
import { TextAreaTextApi, TextState } from './textarea-helpers/TextAreaTextApi';

export const renderedOutputFromMarkdown = (md: string): string => {
  marked.use({
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: true,
    extensions: [
      scriptureQuotesExtension,
      highlightExtension,
      allUpperExtension,
      smallCapsExtension,
      eraExtension,
      bibleLinkExtension,
      superscriptExtension,
    ],
  });

  return marked.parse(md);
};

export interface MDToolbarButton {
  name: string;
  keyboardShortcut?: string;
  buttonContents: JSX.Element;
  execute: (state: TextState, api: TextAreaTextApi) => void;
}

export interface MDToolbarButtonGroup {
  buttons: MDToolbarButton[];
}

export interface MDToolbar {
  buttonGroups: MDToolbarButtonGroup[];
}
