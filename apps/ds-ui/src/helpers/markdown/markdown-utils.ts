import { marked } from 'marked';
import { allUpperExtension } from './allUpperExtension';
import { highlightExtension } from './highlightExtension';
import { smallCapsExtension } from './smallCapsExtension';
import { eraExtension } from './eraExtension';
import { bibleLinkExtension } from './bibleLinkExtension';
import { scriptureQuotesExtension } from './scriptureQuotes';

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
      highlightExtension,
      allUpperExtension,
      smallCapsExtension,
      eraExtension,
      bibleLinkExtension,
      scriptureQuotesExtension,
    ],
  });

  return marked.parse(md);
};
