import { marked } from 'marked';
import { AllUpperExtension } from './extensions/allUpper';
import { BibleLinkExtension } from './extensions/bibleLink';
import { EraExtension } from './extensions/era';
import { FootnoteRefExtension, Footnotes } from './extensions/footnotes';
import { HighlightExtension } from './extensions/highlight';
import { LinksInNewWindow } from './extensions/links';
import { ScriptureQuotes } from './extensions/scripture-quotes';
import { SmallCapsExtension } from './extensions/small-caps';
import { SuperscriptExtension } from './extensions/superscript';

interface MarkdownOptions {
  defaultVersion: string;
  scriptureContext?: string;
}

export const outputFromMD = (
  md: string,
  defaultVersion: string = '',
  scriptureContext?: string | undefined
): string => {
  const options: MarkdownOptions = { defaultVersion, scriptureContext };

  marked.use({
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: true,
    extensions: [
      FootnoteRefExtension,
      HighlightExtension,
      AllUpperExtension,
      SmallCapsExtension,
      EraExtension,
      BibleLinkExtension(options.defaultVersion, options.scriptureContext),
      SuperscriptExtension,
    ],
  });
  marked.use({ renderer: ScriptureQuotes(options.scriptureContext) });
  marked.use({ renderer: Footnotes });
  marked.use({ renderer: LinksInNewWindow });

  return marked.parse(md);
};
