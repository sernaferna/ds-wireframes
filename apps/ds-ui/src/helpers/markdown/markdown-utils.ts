import { marked } from 'marked';
import { allUpperExtension } from './extensions/allUpperExtension';
import { highlightExtension } from './extensions/highlightExtension';
import { smallCapsExtension } from './extensions/smallCapsExtension';
import { eraExtension } from './extensions/eraExtension';
import { bibleLinkExtension } from './extensions/bibleLinkExtension';
import { superscriptExtension } from './extensions/superscriptExtension';
import { scriptureQuotes } from './extensions/scriptureQuotes';
import { linksInNewWindow } from './extensions/links';
import { footnotes, fixFootnoteDiv } from './extensions/fnExtension';
import { TextAreaTextApi, TextState } from './textarea-helpers/TextAreaTextApi';

/**
 * Parses markdown and produces formatted, HTML output. All of the
 * heavy lifting is done by **marked**; this function serves mostly
 * as a central place to pull together all of the custom extensions
 * that were created, and give a standard set of marked options.
 *
 * @param md String containing markdown
 * @returns Formatted (HTML) string
 */
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
  marked.use({ renderer: fixFootnoteDiv });

  return marked.parse(md);
};

/**
 * The following interfaces provide the structure for defining the
 * parameters for a button that will go in the markdown editor's
 * toolbar.
 */
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
