import { marked } from 'marked';

export const allUpperExtension: marked.TokenizerExtension | marked.RendererExtension = {
  name: 'allUpperExtension',
  level: 'inline',
  start(src) {
    return src.match(/\^\^\^/)?.index || -1;
  },
  tokenizer(src, tokens) {
    const rule = /^\^\^\^([^^]+)\^\^\^/;
    const match = rule.exec(src);
    if (!match) {
      return;
    }

    const token = {
      type: 'allUpperExtension',
      raw: match[0],
      individualWords: match[1].split(' '),
    };
    return token;
  },
  renderer(token) {
    let returnString = '';

    token.individualWords.forEach((word: string) => {
      returnString += `<span style="text-transform: uppercase;">${word.substring(
        0,
        1
      )}</span><span style="text-transform: lowercase; font-variant: small-caps;">${word.substring(
        1,
        word.length
      )}</span> `;
    });

    return returnString;
  },
};
