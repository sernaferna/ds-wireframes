import { marked } from 'marked';
import { isReferenceValid } from '@devouringscripture/common';

const fullMatchRE = /^\|> (?:\|> )*(?:\(\((.*)\)\) )/;
const lineMatchRE = /^\|> /;

export const scriptureQuotes: Partial<Omit<marked.Renderer<false>, 'options'>> = {
  paragraph(text) {
    if (!/^\|&gt; /.test(text)) {
      return '<p>' + text + '</p>';
    }

    let responseString = '<blockquote>';
    let fixedText = text.replaceAll('&gt;', '>');
    const rawPagraphs = fixedText.split('\n');
    let citation: string | undefined = undefined;

    for (let i = 0; i < rawPagraphs.length; i++) {
      let fixedString = rawPagraphs[i];

      if (i === 0) {
        const citationMatch = fullMatchRE.exec(fixedString);
        if (citationMatch) {
          citation = citationMatch[1];
          fixedString = fixedString.replace(citationMatch[0], '|> ');
        }
      }

      let level = 0;

      while (lineMatchRE.test(fixedString)) {
        level++;
        fixedString = fixedString.replace(lineMatchRE, '');
      }

      if (fixedString.trim() === '') {
        fixedString = '&nbsp;';
      }
      responseString += `<p style="margin-top: 0; margin-bottom: 0; padding-left: ${level}em;">${fixedString}</p>`;
    }

    if (citation) {
      let mdCitation = isReferenceValid(citation) && !/<a/.test(citation) ? `[|${citation}|]` : citation;
      mdCitation = marked.parseInline(mdCitation);
      responseString += `<p style="margin-top: 0; margin-bottom: 0; text-align: right; font-style: italic;">${mdCitation}</p>`;
    }

    responseString += '</blockquote>';

    return responseString;
  },
};
