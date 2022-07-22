import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { Literal } from 'unist';
import { parseLink, getBibleLinkObj } from './bible-link-helpers';

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

      const newLink = getBibleLinkObj(lf);

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
