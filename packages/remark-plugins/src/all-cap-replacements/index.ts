import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { Literal } from 'unist';

const capitalizedRE = /\b([\p{Lu}\p{Lt}]{1})([\p{Lu}\p{Lt}]+)\b/u;

export function allCapReplacements(): Transformer {
  return (tree) => {
    visit(tree, ['text'], (node, i, parent: any) => {
      if (node.type !== 'text') {
        return;
      }

      const { value } = node as Literal<string>;

      const reResult = capitalizedRE.exec(value);
      if (reResult === null) {
        return;
      }

      const pbDS: boolean = parent.processedByDS || false;
      if (pbDS) {
        return;
      }

      const children: any[] = [];

      children.push({
        type: 'text',
        value: value.substring(0, reResult.index),
      });
      children.push({
        type: 'element',
        processedByDS: true,
        data: {
          hName: 'span',
          hProperties: {
            style: 'text-transform: uppercase;',
          },
        },
        children: [
          {
            type: 'text',
            value: reResult[1],
          },
        ],
      });
      children.push({
        type: 'element',
        processedByDS: true,
        data: {
          hName: 'span',
          hProperties: {
            style: 'text-transform: lowercase; font-variant: small-caps;',
          },
        },
        children: [
          {
            type: 'text',
            value: reResult[2],
          },
        ],
      });
      children.push({
        type: 'text',
        value: value.substring(reResult.index + reResult[0].length),
      });

      parent.children.splice(i, 1, ...children);
    });
  };
}
