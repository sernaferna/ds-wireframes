import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { Literal, Data, Node } from 'unist';

export function tac(): Transformer {
  return (tree) => {
    visit(tree, ['text'], (node, i, parent: any) => {
      if (node.type !== 'text') {
        return;
      }

      const { value } = node as Literal<string>;

      const values = value.split(/\^\^\^/);
      if (values.length === 1 || values.length % 2 === 0) {
        return;
      }

      const children: any[] = [];

      values.forEach((item, index) => {
        if (index % 2 === 0) {
          children.push({
            type: 'text',
            value: item,
          });
          return;
        }

        const individualWords = item.split(' ');
        individualWords.forEach((word, wordIndex) => {
          children.push({
            type: 'element',
            data: {
              hName: 'span',
              hProperties: {
                style: 'text-transform: uppercase;',
              },
            },
            children: [
              {
                type: 'text',
                value: word.substring(0, 1),
              },
            ],
          });
          children.push({
            type: 'element',
            data: {
              hName: 'span',
              hProperties: {
                style: 'text-transform: lowercase; font-variant: small-caps;',
              },
            },
            children: [
              {
                type: 'text',
                value: word.substring(1, word.length),
              },
            ],
          });

          if (wordIndex < individualWords.length - 1) {
            children.push({
              type: 'text',
              value: ' ',
            });
          }
        });
      });

      parent.children.splice(i, 1, ...children);
    });
  };
}
