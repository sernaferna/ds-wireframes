import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { Literal } from 'unist';
import { is } from 'unist-util-is';
import { parseLink, getBibleLinkObj } from '../bible-links/bible-link-helpers';

const lineMatchRE = /^\|> /;
const firstLineMatchRE = /^\|> (?:\(([^\)]*)\) )?/;

export function scriptureQuotes(): Transformer {
  return (tree) => {
    visit(tree, ['paragraph'], (node, i, parent: any) => {
      const { children } = node;

      const textNode = children && children[0];
      if (!is(textNode, 'text')) {
        return;
      }

      const { value } = textNode as Literal<string>;
      let modifiedValue = value;

      const flResult = firstLineMatchRE.exec(modifiedValue);
      if (flResult === null) {
        return;
      }

      const passageRef: string | undefined = flResult[1];
      if (passageRef) {
        modifiedValue = modifiedValue.replace(flResult[0], '|> ');
      }

      const splitNewValue = modifiedValue.toString().split('\n');
      const lines: any[] = [];
      for (let i = 0; i < splitNewValue.length; i++) {
        let fixedString = splitNewValue[i];
        let level = 0;

        // when the line is just |> at the beginning, the space is being stripped out, so...
        if (fixedString === '|>') {
          fixedString = ' ';
          level = 1;
        }

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
          children: [{ type: 'text', value: fixedString }],
        });
      }

      if (passageRef) {
        const lf = parseLink(`[|${passageRef}|]`);
        const link = lf ? getBibleLinkObj(lf) : { type: 'text', value: passageRef };
        lines.push({
          type: 'paragraph',
          data: {
            hProperties: {
              style: 'margin-top: 0; margin-bottom: 0; text-align: right;',
            },
          },
          children: [
            {
              type: 'emphasis',
              children: [link],
            },
          ],
        });
      }

      node.type = 'blockquote';
      node.processedByDS = true;
      node.data = {
        hName: 'blockquote',
      };
      node.children = lines.slice();
    });
  };
}
