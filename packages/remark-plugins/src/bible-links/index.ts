import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { Literal, Data, Node } from 'unist';
import { isReferenceValid, getFormattedReference } from '@devouringscripture/common';

const bibleLinkRE = /\[\[([^\(\]]+)(?:\s+\(([^\)]*)\))?\]([^;\]]*)(?:;([^\]]))?\]/;
interface LinkFields {
  passage: string;
  toDisplay: string;
  version: string;
  index: number;
  matchedLength: number;
}
const parseLink = (inputString: string): LinkFields | undefined => {
  const result = bibleLinkRE.exec(inputString);

  if (result === null) {
    return undefined;
  }

  const setSimple: boolean = result[4] !== undefined && result[4].includes('s') ? true : false;

  const displayString = setSimple ? result[2] || result[1] : result[2] || getFormattedReference(result[1], false);

  const returnObj: LinkFields = {
    passage: result[1],
    toDisplay: displayString,
    version: result[3] || 'ESV',
    index: result.index,
    matchedLength: result[0].length,
  };

  return returnObj;
};

export function bibleLinks(): Transformer {
  return (tree) => {
    visit(tree, ['text'], (node, i, parent: any) => {
      if (node.type !== 'text') {
        return;
      }

      const { value } = node as Literal<string>;

      const lf = parseLink(value);
      if (lf === undefined) {
        return;
      }
      if (!isReferenceValid(lf.passage)) {
        return;
      }

      const searchString = encodeURIComponent(getFormattedReference(lf.passage, false));

      const linkUrl = `https://www.biblegateway.com/passage/?search=${searchString}&version=${lf.version}`;

      const newLink = {
        type: 'link',
        title: `${lf.passage} (${lf.version})`,
        url: linkUrl,
        data: {
          hProperties: {
            target: '_blank',
          },
        },
        children: [
          {
            type: 'text',
            value: lf.toDisplay + ` (${lf.version})✞`,
          },
        ],
      };

      const returnChildren = [
        {
          type: 'text',
          value: value.substring(0, lf.index),
        },
        newLink,
        {
          type: 'text',
          value: value.substring(lf.index + lf.matchedLength),
        },
      ];

      parent.children.splice(i, 1, ...returnChildren);
    });
  };
}
