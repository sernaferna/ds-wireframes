import { marked } from 'marked';

export const smallCapsExtension: marked.TokenizerExtension | marked.RendererExtension = {
  name: 'smallCapsExtension',
  level: 'inline',
  start(src) {
    return src.match(/\^-\^/)?.index || -1;
  },
  tokenizer(src, tokens) {
    const rule = /^\^-\^([^^]+)\^-\^/;
    const match = rule.exec(src);
    if (!match) {
      return;
    }

    const token = {
      type: 'smallCapsExtension',
      raw: match[0],
      scText: match[1],
      tokens: [],
    };
    this.lexer.inline(token.scText, token.tokens);
    return token;
  },
  renderer(token) {
    return `<span style="font-variant: small-caps;">${this.parser.parseInline(token.tokens || token.scText)}</span> `;
  },
};
