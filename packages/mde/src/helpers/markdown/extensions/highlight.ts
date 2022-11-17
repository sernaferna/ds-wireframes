import { marked } from 'marked';

/**
 * Handles text in the format `==text==`
 */
export const HighlightExtension: marked.TokenizerExtension | marked.RendererExtension = {
  name: 'highlightExtension',
  level: 'inline',
  start(src) {
    return src.match(/==/)?.index || -1;
  },
  tokenizer(src, tokens) {
    const rule = /^==([^=]+)==/;
    const match = rule.exec(src);
    if (!match) {
      return;
    }

    const token = {
      type: 'highlightExtension',
      raw: match[0],
      markText: match[1],
      tokens: [],
    };
    this.lexer.inline(token.markText, token.tokens);
    return token;
  },
  renderer(token) {
    return `<mark>${this.parser.parseInline(token.tokens || token.markText)}</mark>`;
  },
};
