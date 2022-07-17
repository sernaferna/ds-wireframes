import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { Literal } from 'unist';

const lineMatchRE = /^\|> /;
const verseAtBeginningRE = /^(\d+)\s/;
const verseInMiddleRE = /\s(\d+)\s/;

const getTextWithNumbers = (text: string) => {
  if (!verseAtBeginningRE.test(text) && !verseInMiddleRE.test(text)) {
    if (/^\s*$/.test(text)) {
      return [
        {
          type: 'html',
          value: '&nbsp;',
        },
      ];
    } else {
      return [
        {
          type: 'text',
          value: text,
        },
      ];
    }
  }

  const pieces: any[] = [];
  let remainingText = text;

  const firstMatch = verseAtBeginningRE.exec(remainingText);
  if (firstMatch) {
    pieces.push({
      type: 'sup',
      data: {
        hName: 'sup',
      },
      children: [
        {
          type: 'text',
          value: firstMatch[1],
        },
      ],
    });

    remainingText = remainingText.substring(firstMatch.index + firstMatch[0].length);
  }

  while (verseInMiddleRE.test(remainingText)) {
    const newVerseMatch = verseInMiddleRE.exec(remainingText);
    pieces.push({
      type: 'text',
      value: remainingText.substring(0, newVerseMatch!.index + 1),
    });
    pieces.push({
      type: 'sup',
      data: {
        hName: 'sup',
      },
      children: [
        {
          type: 'text',
          value: newVerseMatch![1],
        },
      ],
    });

    remainingText = remainingText.substring(newVerseMatch!.index + newVerseMatch![0].length);
  }

  pieces.push({
    type: 'text',
    value: remainingText,
  });

  return pieces;
};

export function poetryBlocks(): Transformer {
  return (tree) => {
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

        // when the line is just |> at the beginning, the space is being stripped out, so...
        if (fixedString === '|>') {
          fixedString = ' ';
          level = 1;
        }

        while (lineMatchRE.test(fixedString)) {
          level++;
          fixedString = fixedString.replace(lineMatchRE, '');
        }

        const childOutputs = getTextWithNumbers(fixedString);

        lines.push({
          type: 'paragraph',
          data: {
            hProperties: {
              style: `margin-top: 0; margin-bottom: 0; padding-left: ${level}em;`,
            },
          },
          children: childOutputs,
        });
      }

      const children = [
        {
          type: 'blockquote',
          children: lines,
        },
      ];

      parent.children.splice(i, 1, ...children);
    });
  };
}
