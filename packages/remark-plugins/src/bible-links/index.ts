import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { Literal, Data, Node } from 'unist';
import { isReferenceValid, getFormattedReference } from '@devouringscripture/common';

const bibleLinkRE = /\[\[([^\]]*)\]([^\]]*)\]/;
const nivRE = /NIV/i;
const esvRE = /ESV/i;

export function bibleLinks(): Transformer {
  return (tree) => {
    visit(tree, ['text'], (node, i, parent: any) => {
      if (node.type !== 'text') {
        return;
      }

      const { value } = node as Literal<string>;

      const parseResult = bibleLinkRE.exec(value);
      if (parseResult === null) {
        return;
      }
      if (!isReferenceValid(parseResult[1])) {
        return;
      }

      let searchString = getFormattedReference(parseResult[1]);
      searchString = encodeURIComponent(searchString);

      const linkUrl = `https://www.biblegateway.com/passage/?search=${searchString}&version=${parseResult[2]}`;

      let linkClass = 'biblelink';
      if (nivRE.test(parseResult[2])) {
        linkClass = 'nivlink';
      }
      if (esvRE.test(parseResult[2])) {
        linkClass = 'esvlink';
      }

      const newLink = {
        type: 'link',
        title: `${parseResult[1]} (${parseResult[2]})`,
        url: linkUrl,
        data: {
          hProperties: {
            className: [linkClass],
            target: '_blank',
          },
        },
        children: [
          {
            type: 'text',
            value: 'blah',
          },
        ],
      };

      parent.children.splice(i, 1, newLink);
    });
  };
}
