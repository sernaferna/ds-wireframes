import { SectionDocumentation, PartType } from '../tutorial/TutorialTypes';

export const mdMainSection: SectionDocumentation = {
  mainSection: {
    title: 'Advanced Notation: Standard Markdown',
    parts: [
      {
        type: PartType.text,
        content: `This section goes into more detail on some of the advanced notations available in markdown. These are not specific to **Devouring Scripture**, they're available in most tools where markdown notation is used.`,
      },
    ],
  },
  subSections: [
    {
      title: 'Tables',
      parts: [
        {
          type: PartType.text,
          content: `A table can be created with careful use of the \`|\` (pipe) character to delineate cells within the table.`,
        },
        {
          type: PartType.example,
          content: `| Person | Score |
|--|--|
| Suresh | 15 |
| Samantha | 20 |`,
        },
        {
          type: PartType.text,
          content: `Notice the three parts of the table:
          
1. Header cells for the table come at the top
1. A separator row (with dashes inside the cells)
1. As many rows as desired of cells for the body of the table.`,
        },
        {
          type: PartType.text,
          content: `If desired, the spacing can be made more precise; it won't change the resultant formatted view, but sometimes helps with readability in markdown format:`,
        },
        {
          type: PartType.example,
          content: `| Person   | Score |
|----------|-------|
| Suresh   | 15    |
| Samantha | 20    |`,
        },
        {
          type: PartType.text,
          content: `Tables *can* get very large, in which case attempting to format them can be nearly impossible, but as long as the notation is followed the table can still be rendered into the formatted version.`,
        },
        {
          type: PartType.example,
          content: `A more complex table might look like this:

| Man | Situation | Reaction |
|--|--|--|
| Peter | Cornelius bows down to worship him | Immediately stops Cornelius, saying he's only a man just like Cornelius |
| Paul and Barnabas | Called "gods" because of a miracle they've performed | Tear their garments in an act of distress, and rush to tell the crowds that they're only men, and it's God whom the people should be worshipping |
| Herod | Called "a god" by a crowd | Says, yeah, that sounds about right |`,
        },
        {
          type: PartType.heading,
          content: `Alignment`,
        },
        {
          type: PartType.text,
          content: `In most cases that second row of dashes appears purely so that markdown can separate the header from the other cells, but they can also be used to control alignment for the column:

* Putting a colon at the beginning of the dashes such as \`:--\` will cause the text to be left justified (which is also the default)
* Putting a colon on either end of the dashes such as \`:--:\` will cause the text to be centred
* Putting a colon at the end of the dashes such as \`--:\` will cause the text to be right justified.`,
        },
        {
          type: PartType.example,
          content: `| Left | Centre | Right |
| :-- | :--: | --: |
| This text is left justified | This text is centered | This text is right justified |
| Still left justified | Still centred | Still right justified |`,
        },
      ],
    },
    {
      title: 'Footnotes',
      parts: [
        {
          type: PartType.text,
          content: `Footnotes can be created via two related notations in the markdown:
            
1. In the body of the text include a footnote reference such as\`[^1]\`, \`[^2]\`, etc.
2. The footnote itself, which starts with \`[^1]:\`—that is, matching the footnote reference, with a \`:\`
    
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
            'In the formatted output, notice that the footnotes always show up at the very bottom of the formatted text, regardless of where they were placed in the markdown text. In addition, the footnote reference is rendered as a link, which the user can click to go to the text of the actual footnote, and there is another link at the end of the footnote text to bring the reader back to the original spot in the text where the footnote reference resided. (This is typically only useful for very large amounts of text, where the reader might have a lot of scrolling to do, but the links are created regardless.)',
        },
        {
          type: PartType.heading,
          content: 'Ordering of Numbers',
        },
        {
          type: PartType.text,
          content:
            "The actual numbering used in the markdown doesn't matter, footnotes will be rendered in the order they're found, as long as the number in the footnote reference and the number in the footnot itself match:",
        },
        {
          type: PartType.example,
          content: `This text includes[^2] a couple[^1] of footnotes.
            
[^2]: This is the first footnote
    
[^1]: This is the second

It also includes another paragraph of text.`,
        },
      ],
    },
  ],
};
