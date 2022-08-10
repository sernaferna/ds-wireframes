import { marked } from 'marked';

export const highlightExtension: marked.TokenizerExtension | marked.RendererExtension = {
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
    };
    return token;
  },
  renderer(token) {
    return `<mark>${token.markText}</mark>`;
  },
};
