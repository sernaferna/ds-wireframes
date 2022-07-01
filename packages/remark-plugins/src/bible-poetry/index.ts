import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { Literal, Data, Node } from 'unist';

const lineMatchRE = /^\|> /;

export function poetryBlocks(): Transformer {
  const poetryFormatter = (tree: Node<Data>, firstVisit: boolean = true) => {
    visit(tree, ['text'], (node, i, parent: any) => {
      if (node.type !== 'text') {
        return;
      }

      const { value } = node as Literal<string>;

      if (!lineMatchRE.test(value)) {
        return;
      }

      const splitNewValue = value.toString().split('\n');
      const lines: any[] = [];
      for (let i = 0; i < splitNewValue.length; i++) {
        let fixedString = splitNewValue[i];
        let level = 0;

        while (lineMatchRE.test(fixedString)) {
          level++;
          fixedString = fixedString.replace(lineMatchRE, '');
        }

        lines.push({
          type: 'paragraph',
          data: {
            hProperties: {
              style: `margin-top: 0; margin-bottom: 0; padding-left: ${level}em;`,
            },
          },
          children: [
            {
              type: 'text',
              value: fixedString,
            },
          ],
        });
      }

      const children = [
        {
          type: 'blockquote',
          data: {
            hProperties: {
              style: '',
            },
          },
          children: lines,
        },
      ];

      parent.children.splice(i, 1, ...children);

      poetryFormatter(tree, false);
    });
  };

  return (tree) => {
    poetryFormatter(tree);
  };
}
