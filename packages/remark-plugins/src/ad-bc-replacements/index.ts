import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { Literal } from 'unist';

const eraRE = /[\d\s]((?:A\.D\.)|(?:B\.C\.)|(?:B\.C\.E\.)|(?:C\.E\.))/;

export function adbcReplacements(): Transformer {
  return (tree) => {
    visit(tree, ['text'], (node, i, parent: any) => {
      if (node.type !== 'text') {
        return;
      }

      const { value } = node as Literal<string>;

      const reResult = eraRE.exec(value);
      if (reResult === null) {
        return;
      }

      const pbac: boolean = parent.processedByDS || false;
      if (pbac) {
        return;
      }

      const strippedResult: string = reResult[1].replace('.', '');
      let newResult = '';
      for (let i = 0; i < strippedResult.length; i++) {
        newResult += strippedResult.charAt(i) + '.';
      }

      const children: any[] = [];

      children.push({
        type: 'text',
        value: value.substring(0, reResult.index + 1),
      });
      children.push({
        type: 'element',
        processedByDS: true,
        data: {
          hName: 'span',
          hProperties: {
            style: 'text-transform: lowercase; font-variant: small-caps',
          },
        },
        children: [
          {
            type: 'text',
            value: newResult,
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
