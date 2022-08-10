import { marked } from 'marked';
import { isReferenceValid } from '@devouringscripture/common';

const fullMatchRE = /^\|> (?:\(\((.*)\)\) )?(?=\n\n)/;
const lineMatchRE = /^\|> /;

interface InternalParagraph {
  level: number;
  text: marked.Token[];
}

export const scriptureQuotesExtension: marked.TokenizerExtension | marked.RendererExtension = {
  name: 'scriptureQuotesExtension',
  level: 'block',
  start(src) {
    return src.match(/|>/)?.index || -1;
  },
  tokenizer(src, tokens) {
    const flResult = fullMatchRE.exec(src);
    if (!flResult) {
      console.log('no match');
      return;
    }

    console.log(src);

    const citation: string | undefined = flResult[1];

    const returnParagraphs: InternalParagraph[] = [];
    const rawParagraphs = src.split('\n');

    rawParagraphs.forEach((p, index) => {
      let level = 0;
      let fixedString = p;

      if (citation && index === 0) {
        fixedString = fixedString.replace(flResult[0], '|> ');
      }

      while (lineMatchRE.test(fixedString)) {
        level++;
        fixedString = fixedString.replace(lineMatchRE, '');
      }

      returnParagraphs.push({ level, text: this.lexer.inlineTokens(fixedString, []) });
    });

    const token = {
      type: 'scriptureQuotesExtension',
      raw: src,
      paragraphs: returnParagraphs.slice(),
      citation,
    };

    return token;
  },
  renderer(token) {
    console.log(token.tokens);
    const paras = token.paragraphs.map((p: InternalParagraph) => {
      return `<p style="margin-top: 0; margin-bottom: 0; padding-left: ${p.level}em;">${p.text}</p>`;
    });
    const citation = `<p style="margin-top: 0; margin-bottom: 0; text-align: right;">${
      isReferenceValid(token.citation) ? `[|${token.citation}|]` : token.citation
    }</p>`;
    return `<blockquote>${paras.join('')}${citation}</blockquote>`;
  },
  childTokens: ['blockquote', 'p'],
};
