import { marked } from 'marked';
import { isReferenceValid } from '@devouringscripture/common';

const fullMatchRE = /^\|> (?:\|> )*(?:\(\((.*)\)\) )/;
const lineMatchRE = /^\|> /;

interface InternalParagraph {
  level: number;
  text: string;
  type: 'qs' | 'c' | 'n';
  tokens: marked.Token[];
}

const createP = (p: InternalParagraph): string => {
  if (p.type === 'n') {
    return `<p>${p.text}</p>`;
  }

  let response = `<p style="margin-top: 0; margin-bottom: 0; `;
  if (p.type === 'qs') {
    response += `padding-left: ${p.level}em">`;
  }
  if (p.type === 'c') {
    response += 'text-align: right; font-style: italic;">';
  }
  if (p.type === 'c' && isReferenceValid(p.text)) {
    response += `[|${p.text}|]</p>`;
  } else {
    response += p.text + '</p>';
  }

  return response;
};

export const scriptureQuotesExtension: marked.RendererExtension | marked.TokenizerExtension = {
  name: 'scriptureQuotesExtension',
  level: 'block',
  start(src) {
    return src.match(/|> /)?.index || -1;
  },
  tokenizer(src, tokens) {
    const match = fullMatchRE.exec(src);
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
          returnParagraphs.push({ level: 0, text: citation, type: 'c', tokens: this.lexer.inlineTokens(citation, []) });
          citation = null;
        }

        returnParagraphs.push({
          level: 0,
          text: rawParagraphs[i],
          type: 'n',
          tokens: this.lexer.inlineTokens(rawParagraphs[i], []),
        });
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

      returnParagraphs.push({ level, text: fixedString, type: 'qs', tokens: this.lexer.inlineTokens(fixedString, []) });
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
