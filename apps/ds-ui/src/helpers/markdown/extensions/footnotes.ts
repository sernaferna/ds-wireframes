import { marked } from 'marked';

const fnRefRE = /^\[\^([^\]]+)\](?!:)/;
const fnRE = /^\[\^([^\]]+)\]: /;

export const footnoteRefExtension: marked.TokenizerExtension | marked.RendererExtension = {
  name: 'footnoteRefExtension',
  level: 'inline',
  start(src) {
    return src.match(fnRefRE)?.index || -1;
  },
  tokenizer(src, tokens) {
    const refMatch = fnRefRE.exec(src);
    if (!refMatch) {
      return;
    }

    const refToken: marked.Tokens.Generic = {
      type: 'footnoteRefExtension',
      raw: refMatch[0],
      ref: refMatch[1],
    };

    return refToken;
  },
  renderer(token) {
    return `<sup><a href="#user-content-fn-${token.ref}" id="user-content-fnref-${token.ref}">${token.ref}</a></sup>`;
  },
};

export const footnotes: Partial<Omit<marked.Renderer<false>, 'options'>> = {
  paragraph(text) {
    const fnMatch = fnRE.exec(text);
    if (!fnMatch) {
      return false;
    }

    let returnString = '<ul><li>';
    returnString += text.replace(fnMatch[0], '');
    returnString += ` <a href="#user-content-fnref-${fnMatch[1]}" id="user-content-fn-${fnMatch[1]}">↩</a>`;
    returnString += '</li></ul>';

    return returnString;
  },
};
