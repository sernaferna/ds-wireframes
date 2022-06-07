import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { Literal, Data, Node } from 'unist';

export const lowerCaps = (): Transformer => {
  return (tree) => {
    visit(tree, ['text'], (node, i, parent: any) => {
      if (node.type !== 'text') {
        return;
      }

      const { value } = node as Literal<string>;

      const values = value.split(/\^~/);
      if (values.length === 1 || values.length % 2 === 0) {
        return;
      }

      const children: Node<Data>[] = values.map((str, i) =>
        i % 2 === 0
          ? {
              type: 'text',
              value: str,
            }
          : {
              type: 'span',
              data: {
                hName: 'span',
                hProperties: {
                  className: ['sc2'],
                },
              },
              children: [
                {
                  type: 'text',
                  value: str,
                },
              ],
            }
      );

      parent.children.splice(i, 1, ...children);
    });
  };
};
