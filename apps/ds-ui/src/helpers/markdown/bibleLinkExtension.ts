import { marked } from 'marked';
import { getFormattedReference, isReferenceValid } from '@devouringscripture/common';

export const bibleLinkRE = /^\[\|([^(|]+)(?:\s+\(([^)]*)\))?\|([^;\]]*)(?:;([^\]]))?\]/;

export const bibleLinkExtension: marked.TokenizerExtension | marked.RendererExtension = {
  name: 'bibleLinkExtension',
  level: 'inline',
  start(src) {
    return src.match(/\[\|/)?.index || -1;
  },
  tokenizer(src, tokens) {
    const match = bibleLinkRE.exec(src);
    if (!match) {
      return;
    }
    const passage = match[1];
    if (!isReferenceValid(passage)) {
      return;
    }

    const index = match.index;
    const matchedLength = match[0].length;

    const setSimple: boolean = match[4] !== undefined && match[4].includes('s') ? true : false;

    const toDisplay = setSimple ? match[2] || match[1] : match[2] || getFormattedReference(match[1], false);

    const version = match[3] || 'ESV';

    const searchString = encodeURIComponent(getFormattedReference(match[1], false));

    const linkUrl = `https://www.biblegateway.com/passage/?search=${searchString}&version=${version}`;

    const token = {
      type: 'bibleLinkExtension',
      raw: match[0],
      passage,
      toDisplay,
      version,
      index,
      matchedLength,
      linkUrl,
    };
    return token;
  },
  renderer(token) {
    return `<a title="${token.passage} ${token.version}" href="${token.linkUrl}" target="_blank">${token.toDisplay} (${token.version})✞</a>`;
  },
};
