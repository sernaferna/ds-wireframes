import { getFormattedReference, isReferenceValid } from '@devouringscripture/common';

export const bibleLinkRE = /\[\|([^\(\|]+)(?:\s+\(([^\)]*)\))?\|([^;\]]*)(?:;([^\]]))?\]/;

/**
 * Represents the different pieces of information retrieved from a MD
 * bible link.
 */
export interface LinkFields {
  passage: string;
  toDisplay: string;
  version: string;
  index: number;
  matchedLength: number;
  linkUrl: string;
}

/**
 * Helper function to parse a string and pull out bible link data.
 *
 * If the string isn't valid, or if the reference isn't valid,
 * `undefined` is returned, and should be treated accordingly
 * by the caller.
 *
 * @param inputString MD for a bible link
 * @returns `LinkFields` object with all of the fields necessary for building a link, or undefined if it's not valid
 */
export const parseLink = (inputString: string): LinkFields | undefined => {
  const result = bibleLinkRE.exec(inputString);

  if (result === null) {
    return undefined;
  }

  const passage = result[1];
  if (!isReferenceValid(passage)) {
    return undefined;
  }
  const index = result.index;
  const matchedLength = result[0].length;

  const setSimple: boolean = result[4] !== undefined && result[4].includes('s') ? true : false;

  const toDisplay = setSimple ? result[2] || result[1] : result[2] || getFormattedReference(result[1], false);

  const version = result[3] || 'ESV';

  const searchString = encodeURIComponent(getFormattedReference(result[1], false));

  const linkUrl = `https://www.biblegateway.com/passage/?search=${searchString}&version=${version}`;

  const returnObj: LinkFields = {
    passage,
    toDisplay,
    version,
    index,
    matchedLength,
    linkUrl,
  };

  return returnObj;
};

/**
 * Helper function to get a **link** to be inserted into the tree,
 * based on DS bible links.
 *
 * @param fields `LinkFields` object with the required data for building the link
 * @returns Object for a link ready to be inserted into the tree
 */
export const getBibleLinkObj = (fields: LinkFields) => {
  return {
    type: 'link',
    processedByDS: true,
    title: `${fields.passage} (${fields.version})`,
    url: fields.linkUrl,
    data: {
      hProperties: {
        target: '_blank',
      },
    },
    children: [
      {
        type: 'text',
        value: fields.toDisplay + ` (${fields.version})✞`,
      },
    ],
  };
};
