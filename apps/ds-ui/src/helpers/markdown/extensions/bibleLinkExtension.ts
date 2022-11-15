import { marked } from 'marked';
import { getFormattedReference, isReferenceValid } from '@devouringscripture/common';

export const bibleLinkRE = /^\[\|([^(|]+)(?:\s+\(([^)]*)\))?\|([^;\]]*)(?:;([^\]]+))?\]/;

/**
 * Converts `[|REF|]` notation to links to Bible Gateway
 */
export const bibleLinkExtension = (
  defaultVersion: string = 'ESV',
  context: string | undefined = undefined
): marked.TokenizerExtension | marked.RendererExtension => {
  return {
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
      if (!isReferenceValid(passage, context)) {
        return;
      }

      const index = match.index;
      const matchedLength = match[0].length;

      const setSimple: boolean = match[4] !== undefined && match[4].includes('s') ? true : false;
      const hideVersion: boolean = match[4] !== undefined && match[4].includes('h') ? true : false;

      let toDisplay = setSimple ? match[2] || match[1] : match[2] || getFormattedReference(match[1], false, context);
      toDisplay = toDisplay.replace(/([0-9])-([0-9])/, '$1–$2');

      const version = hideVersion ? undefined : match[3] || defaultVersion;

      const searchString = encodeURIComponent(getFormattedReference(match[1], false, context));

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
      let title = token.passage;
      if (token.version) title += ` ${token.version}`;

      let displayText = token.toDisplay;
      if (token.version) displayText += ` (${token.version})`;
      return `<a title="${title}" href="${token.linkUrl}" target="_blank">${displayText}✞</a>`;
    },
  };
};
