import { marked } from 'marked';
import { isReferenceValid } from '@devouringscripture/common';

const fullMatchRE = /^\|> (?:\|> )*(?:\(\((.*)\)\) )/;
const lineMatchRE = /^\|> /;

interface InternalParagraph {
  level: number;
  text: string;
  type: 'qs' | 'c' | 'n';
  tokens: marked.Token[];
  formattedText?: string;
}

const createP = (p: InternalParagraph): string => {
  if (p.type === 'n') {
    return `<p>${p.formattedText}</p>`;
  }

  let response = `<p style="margin-top: 0; margin-bottom: 0; `;
  if (p.type === 'qs') {
    response += `padding-left: ${p.level}em">`;
  }
  if (p.type === 'c') {
    response += 'text-align: right; font-style: italic;">';
  }
  response += p.formattedText + '</p>';

  return response;
};

export const scriptureQuotesExtension: marked.RendererExtension | marked.TokenizerExtension = {
  name: 'scriptureQuotesExtension',
  level: 'block',
  start(src) {
    return src.match(/|> /)?.index || -1;
  },
  tokenizer(src, tokens) {
    const match = lineMatchRE.exec(src);
    if (!match) {
      return;
    }

    const returnParagraphs: InternalParagraph[] = [];
    const rawParagraphs = match.input.split('\n');
    const returnTokens: marked.Token[] = [];
    let citation: string | null = null;

    for (let i = 0; i < rawParagraphs.length; i++) {
      if (!lineMatchRE.test(rawParagraphs[i])) {
        if (citation) {
          const mdCitation = isReferenceValid(citation) && !/\[\|/.test(citation) ? `[|${citation}|]` : citation;
          const citPara: InternalParagraph = {
            level: 0,
            text: mdCitation,
            type: 'c',
            tokens: [],
          };
          this.lexer.inline(citPara.text, citPara.tokens);
          returnParagraphs.push(citPara);

          citation = null;
        }

        const regPara: InternalParagraph = {
          level: 0,
          text: rawParagraphs[i],
          type: 'n',
          tokens: [],
        };
        this.lexer.inline(regPara.text, regPara.tokens);
        returnParagraphs.push(regPara);
        continue;
      }

      let fixedString = rawParagraphs[i];

      const citationMatch = fullMatchRE.exec(rawParagraphs[i]);
      if (citationMatch) {
        citation = citationMatch[1];
        fixedString = fixedString.replace(citationMatch[0], '|> ');
      }

      let level = 0;

      while (lineMatchRE.test(fixedString)) {
        level++;
        fixedString = fixedString.replace(lineMatchRE, '');
      }

      const qsPara: InternalParagraph = {
        level,
        text: fixedString,
        type: 'qs',
        tokens: [],
      };
      this.lexer.inline(qsPara.text, qsPara.tokens);
      returnParagraphs.push(qsPara);
    }

    if (citation) {
      const mdCitation = isReferenceValid(citation) && !/\[\|/.test(citation) ? `[|${citation}|]` : citation;
      const citPara: InternalParagraph = {
        level: 0,
        text: mdCitation,
        type: 'c',
        tokens: [],
      };
      this.lexer.inline(citPara.text, citPara.tokens);
      returnParagraphs.push(citPara);

      citation = null;
    }

    const token = {
      type: 'scriptureQuotesExtension',
      raw: src,
      paragraphs: returnParagraphs.slice(),
      citation,
      tokens: returnTokens,
    };

    return token;
  },
  renderer(token) {
    const paraInputs: InternalParagraph[] = token.paragraphs;
    let inQuote = true;
    let response = '<blockquote>';

    for (let i = 0; i < paraInputs.length; i++) {
      paraInputs[i].formattedText = this.parser.parseInline(paraInputs[i].tokens);
      if (inQuote && (paraInputs[i].type === 'c' || paraInputs[i].type === 'qs')) {
        response += createP(paraInputs[i]);
        continue;
      }
      if (!inQuote && paraInputs[i].type === 'n') {
        response += createP(paraInputs[i]);
        continue;
      }
      if (inQuote && paraInputs[i].type === 'n') {
        inQuote = false;
        response += '</blockquote>';
        response += createP(paraInputs[i]);
        continue;
      }

      inQuote = true;
      response += '<blockquote>';
      response += createP(paraInputs[i]);
    }

    return response;
  },
};
