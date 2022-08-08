import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { Literal } from 'unist';
import { is } from 'unist-util-is';
import { parseLink, getBibleLinkObj } from '../bible-links/bible-link-helpers';

const firstLineMatchRE = /^\|> (?:\(\((.*)\)\) )?/;
const lineMatchRE = /^\|> /;

interface InternalParagraph {
  level: number;
  children: any[];
}

export function scriptureQuotes(): Transformer {
  return (tree) => {
    visit(tree, ['paragraph'], (node, i, parent: any) => {
      const { children } = node;

      // first node should always be text, and may or may not
      // include a `(passage ref)` at the beginning

      const firstNode = children && children[0];
      if (!is(firstNode, 'text')) {
        return;
      }

      const { value } = firstNode as Literal<string>;

      const flResult = firstLineMatchRE.exec(value);
      if (flResult === null) {
        return;
      }

      const passageRef: string | undefined = flResult[1];

      const paragraphs: InternalParagraph[] = [];
      let currentPara: InternalParagraph = { level: 0, children: [] };

      for (let i = 0; i < children.length; i++) {
        const thisNode = children[i];
        if (!is(thisNode, 'text')) {
          currentPara.children.push(thisNode);
          continue;
        }

        const { value: thisValue } = thisNode as Literal<string>;
        let thisString = thisValue;
        if (passageRef && i === 0) {
          thisString = thisString.replace(flResult[0], '|> ');
        }

        const splitNewValue = thisString.toString().split('\n');
        for (let j = 0; j < splitNewValue.length; j++) {
          let fixedString = splitNewValue[j];

          // when the line is just |> at the beginning, the space is being stripped out, so...
          if (fixedString === '|>') {
            fixedString = '|> &nbsp;';
          }

          if (!lineMatchRE.test(fixedString)) {
            currentPara.children.push({ type: 'text', value: fixedString });
            continue;
          }

          // there is a |> at the beginning of the fixed string
          // so we need to push the para and start a new one
          paragraphs.push(currentPara);
          currentPara = { level: 0, children: [] };

          while (lineMatchRE.test(fixedString)) {
            currentPara.level++;
            fixedString = fixedString.replace(lineMatchRE, '');
          }

          currentPara.children.push({
            type: fixedString === '&nbsp;' ? 'html' : 'text',
            value: fixedString,
          });
        }
      }

      // final add for the para that was in process
      paragraphs.push(currentPara);

      const paragraphNodes = paragraphs.map((item) => ({
        type: 'paragraph',
        data: {
          hProperties: {
            style: `margin-top: 0; margin-bottom: 0; padding-left: ${item.level}em;`,
          },
        },
        children: item.children.slice(),
      }));

      if (passageRef) {
        const lf = parseLink(`[|${passageRef}|]`);
        const citation = lf ? getBibleLinkObj(lf) : { type: 'text', value: passageRef };
        paragraphNodes.push({
          type: 'paragraph',
          data: {
            hProperties: {
              style: 'margin-top: 0; margin-bottom: 0; text-align: right;',
            },
          },
          children: [
            {
              type: 'emphasis',
              children: [citation],
            },
          ],
        });
      }

      node.type = 'blockquote';
      node.data = {
        hName: 'blockquote',
      };
      node.children = paragraphNodes.slice();
    });
  };
}
