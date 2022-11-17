import { marked } from 'marked';

const upperRE = /^\^\^\^([^^]+)\^\^\^/;

export const AllUpperExtension: marked.TokenizerExtension | marked.RendererExtension = {
  name: 'AllUpperExtension',
  level: 'inline',
  start(src) {
    return src.match(/\^\^\^/)?.index || -1;
  },
  tokenizer(src, tokens) {
    const match = upperRE.exec(src);
    if (!match) return;

    const token = {
      type: 'AllUpperExtension',
      raw: match[0],
      individualWords: match[1].split(' '),
    };
    return token;
  },
  renderer(token) {
    let returnString = '';

    for (let i = 0; i < token.individualWords.length; i++) {
      const theWord: string = token.individualWords[i];
      returnString += `<span style="text-transform: uppercase;">${theWord.substring(
        0,
        1
      )}</span><span style="text-transform: lowercase; font-variant: small-caps;">${theWord.substring(
        1,
        theWord.length
      )}</span>`;
      if (i < token.individualWords.length - 1) returnString += ' ';
    }

    return returnString;
  },
};
