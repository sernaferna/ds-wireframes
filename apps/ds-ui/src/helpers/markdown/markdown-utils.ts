import { marked } from 'marked';
import { allUpperExtension } from './extensions/allUpperExtension';
import { highlightExtension } from './extensions/highlightExtension';
import { smallCapsExtension } from './extensions/smallCapsExtension';
import { eraExtension } from './extensions/eraExtension';
import { bibleLinkExtension } from './extensions/bibleLinkExtension';
import { superscriptExtension } from './extensions/superscriptExtension';
import { scriptureQuotes } from './extensions/scriptureQuotes';
import { linksInNewWindow } from './extensions/links';
import { footnotes } from './extensions/fnExtension';
import { TextAreaTextApi, TextState } from './textarea-helpers/TextAreaTextApi';

export const renderedOutputFromMarkdown = (md: string): string => {
  marked.use({ renderer: footnotes });
  marked.use({
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: true,
    extensions: [
      highlightExtension,
      allUpperExtension,
      smallCapsExtension,
      eraExtension,
      bibleLinkExtension,
      superscriptExtension,
    ],
  });
  marked.use({ renderer: scriptureQuotes });
  marked.use({ renderer: linksInNewWindow });

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
