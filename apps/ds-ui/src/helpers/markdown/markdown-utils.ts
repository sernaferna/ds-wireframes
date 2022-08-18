import { marked } from 'marked';
import fm from 'front-matter';
import { allUpperExtension } from './extensions/allUpperExtension';
import { highlightExtension } from './extensions/highlightExtension';
import { smallCapsExtension } from './extensions/smallCapsExtension';
import { eraExtension } from './extensions/eraExtension';
import { bibleLinkExtension } from './extensions/bibleLinkExtension';
import { superscriptExtension } from './extensions/superscriptExtension';
import { scriptureQuotes } from './extensions/scriptureQuotes';
import { linksInNewWindow } from './extensions/links';
import { TextAreaTextApi, TextState } from './textarea-helpers/TextAreaTextApi';

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
 * @returns Formatted (HTML) string
 */
export const renderedOutputFromMarkdown = (md: string): string => {
  const options = { ...defaultOptions };
  let markdownString = md;

  try {
    const fmResult = fm(md);
    markdownString = fmResult.body;
    if ((fmResult.attributes as any).defaultVersion) {
      options.defaultVersion = (fmResult.attributes as any).defaultVersion;
    }
    if ((fmResult.attributes as any).scriptureContext) {
      options.scriptureContext = (fmResult.attributes as any).scriptureContext;
    }
  } catch {
    // do nothing; can easily throw exceptions when fm being edited
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
      highlightExtension,
      allUpperExtension,
      smallCapsExtension,
      eraExtension,
      bibleLinkExtension(options.defaultVersion, options.scriptureContext),
      superscriptExtension,
    ],
  });
  marked.use({ renderer: scriptureQuotes(options.defaultVersion, options.scriptureContext) });
  marked.use({ renderer: linksInNewWindow });

  return marked.parse(markdownString);
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
