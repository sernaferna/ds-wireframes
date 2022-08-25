import { RefObject } from 'react';
import { marked } from 'marked';
import { allUpperExtension } from './extensions/allUpperExtension';
import { highlightExtension } from './extensions/highlightExtension';
import { smallCapsExtension } from './extensions/smallCapsExtension';
import { eraExtension } from './extensions/eraExtension';
import { bibleLinkExtension } from './extensions/bibleLinkExtension';
import { superscriptExtension } from './extensions/superscriptExtension';
import { scriptureQuotes } from './extensions/scriptureQuotes';
import { linksInNewWindow } from './extensions/links';
import { footnoteRefExtension, footnotes } from './extensions/footnotes';

interface MarkdownOptions {
  defaultVersion: string;
  scriptureContext?: string;
}

const defaultOptions: MarkdownOptions = {
  defaultVersion: 'ESV',
};

/**
 * Parses markdown and produces formatted, HTML output. All of the
 * heavy lifting is done by **marked**; this function serves mostly
 * as a central place to pull together all of the custom extensions
 * that were created, and give a standard set of marked options.
 *
 * @param md String containing markdown
 * @param defaultVersion Default version of the Bible to use for links
 * @param passageContext Larger passage context to use for working with references
 * @returns Formatted (HTML) string
 */
export const renderedOutputFromMarkdown = (
  md: string,
  defaultVersion?: string | undefined,
  passageContext?: string | undefined
): string => {
  const options = { ...defaultOptions };
  if (defaultVersion) {
    options.defaultVersion = defaultVersion;
  }
  if (passageContext) {
    options.scriptureContext = passageContext;
  }

  marked.use({
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: true,
    extensions: [
      footnoteRefExtension,
      highlightExtension,
      allUpperExtension,
      smallCapsExtension,
      eraExtension,
      bibleLinkExtension(options.defaultVersion, options.scriptureContext),
      superscriptExtension,
    ],
  });
  marked.use({ renderer: scriptureQuotes(options.defaultVersion, options.scriptureContext) });
  marked.use({ renderer: footnotes });
  marked.use({ renderer: linksInNewWindow });

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
  execute: (textBox: RefObject<HTMLTextAreaElement>) => void;
}

export interface MDToolbarButtonGroup {
  buttons: MDToolbarButton[];
}

export interface MDToolbar {
  buttonGroups: MDToolbarButtonGroup[];
}
