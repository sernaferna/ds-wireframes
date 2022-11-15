import { marked } from 'marked';
import { getAllRefsFromString } from '@devouringscripture/common';

const fullMatchRE = /^\|> (?:\|> )*(?:\(\((.*)\)\) )/;
const lineMatchRE = /^\|> /;

/**
 * Handles formatting for `|>` style Scripture Quotes.
 */
export const scriptureQuotes = (
  defaultVersion: string,
  context: string | undefined = undefined
): Partial<Omit<marked.Renderer<false>, 'options'>> => {
  return {
    paragraph(text) {
      if (/<h5>Footnotes/.test(text)) {
        return '<div>' + text + '</div>';
      }
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
        let mdCitation = citation;
        const refs = getAllRefsFromString(mdCitation, context);
        let indexFactor = 0;
        for (let i = 0; i < refs.length; i++) {
          mdCitation =
            mdCitation.substring(0, refs[i].indices[0] + indexFactor) +
            `[|${refs[i].osis}|]` +
            mdCitation.substring(refs[i].indices[1] + 1 + indexFactor);
          indexFactor = mdCitation.length - citation.length;
        }
        mdCitation = marked.parseInline(mdCitation);
        // let mdCitation =
        //   isReferenceValid(citation, context) && !/<a/.test(citation)
        //     ? `[|${citation}|${defaultVersion}${context ? ';s' : ''}]`
        //     : citation;
        // mdCitation = marked.parseInline(mdCitation);
        // mdCitation = mdCitation.replace(/([0-9])-([0-9])/, '$1–$2');
        responseString += `<p style="margin-top: 0; margin-bottom: 0; text-align: right; font-style: italic;">${mdCitation}</p>`;
      }

      responseString += '</blockquote>';

      return responseString;
    },
  };
};
