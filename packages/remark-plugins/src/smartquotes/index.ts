import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { retext } from 'retext';
import retextSmartypants from 'retext-smartypants';

export function smartquotes(): Transformer {
  const processor = retext().use(retextSmartypants, { dashes: 'oldschool' });

  return (tree) => {
    visit(tree, ['text'], (node, i, parent: any) => {
      node.value = processor.processSync(node.value);
    });
  };
}
