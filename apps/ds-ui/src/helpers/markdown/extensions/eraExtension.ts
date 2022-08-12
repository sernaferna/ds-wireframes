import { marked } from 'marked';

/**
 * Handles text in the format ^^A.D.^^
 */
export const eraExtension: marked.TokenizerExtension | marked.RendererExtension = {
  name: 'eraExtension',
  level: 'inline',
  start(src) {
    return src.match(/\^\^/)?.index || -1;
  },
  tokenizer(src, tokens) {
    const rule = /^\^\^([^^]+)\^\^/;
    const match = rule.exec(src);
    if (!match) {
      return;
    }

    const token = {
      type: 'eraExtension',
      raw: match[0],
      eraText: match[1],
    };
    return token;
  },
  renderer(token) {
    return `<span style="text-transform: lowercase; font-variant: small-caps;">${token.eraText}</span>`;
  },
};
