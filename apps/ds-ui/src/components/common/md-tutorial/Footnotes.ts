import { SectionDocumentation, PartType } from './TutorialTypes';

export const footnoteSection: SectionDocumentation = {
  parts: [
    {
      type: PartType.text,
      content: `Perhaps a niche capability, but **footnotes** can also be created. There are two parts to this markup:
  
1. In the body of the text include a footnote reference such as \`[^#]\`, where \`#\` is a number; \`[^1]\`, \`[^2]\`, etc.
2. The footnote itself, which starts with \`[^#]:\`—that is, matching the footnote reference, with a \`:\`
    
such as in the following example:`,
    },
    {
      type: PartType.example,
      content: `This text includes[^1] a footnote.
  
[^1]: This is the footnote. It will show up at the bottom of the formatted output, regardless of where it comes in the markdown.
    
This paragraph continues on after the first one.`,
    },
    {
      type: PartType.text,
      content:
        'In the following formatted output, notice that the footnote will show up at the very bottom, regardless of where it was placed in the markdown text:',
    },
    {
      type: PartType.example,
      content: `This text includes[^2] a couple[^1] of footnotes.
  
[^2]: This is the first footnote
    
[^1]: This is the second`,
    },
  ],
};
