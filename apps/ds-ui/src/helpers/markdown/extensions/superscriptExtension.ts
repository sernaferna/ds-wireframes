import { marked } from 'marked';

/**
 * Handles `^sup^` notation.
 */
export const superscriptExtension: marked.TokenizerExtension | marked.RendererExtension = {
  name: 'superscriptExtension',
  level: 'inline',
  start(src) {
    return src.match(/\^/)?.index || -1;
  },
  tokenizer(src, tokens) {
    const rule = /^\^([^^]+)\^/;
    const match = rule.exec(src);
    if (!match) {
      return;
    }

    const token = {
      type: 'superscriptExtension',
      raw: match[0],
      markText: match[1],
    };
    return token;
  },
  renderer(token) {
    return `<sup>${token.markText}</sup>`;
  },
};
