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
      title: 'Lists and Bullets',
      parts: [
        {
          type: PartType.text,
          content: `Bullets were mentioned in the cheat sheet above, but there's some extra formatting that can be applied.`,
        },
        {
          type: PartType.heading,
          content: 'Bullets',
        },
        {
          type: PartType.text,
          content: `Bulleted lists can be created with either asterisks (\`*\`) or hyphens (\`-\`), followed by a space, at the beginning of the line for each item in the list. Adding 4 spaces at the beginning of the line (before the \`*\` or \`-\`) will cause that item to be a sub-item, under the one above.`,
        },
        {
          type: PartType.example,
          content: `* This is the first item in a bulleted list.
* This is the second
    * This is a sub-bullet
* This is a *final* bullet in the list---and additional asterisks (such as for italics) are fine within the text of the bullet; it won't confuse the formatting`,
        },
        {
          type: PartType.heading,
          content: 'Asterisks vs. Hyphens',
        },
        {
          type: PartType.text,
          content: `It's up to the author as to whether asterisks or hyphens are used for bullets, however, they shouldn't be mixed and matched. In markdown, mixing and matching items like that would cause the markdown formatter to think that a new list is being created.`,
        },
        {
          type: PartType.example,
          content: `Asterisks can be used for bullets:
          
* First item
* Second item

Hyphens can be used instead:

- First item
- Second item

However, mixing and matching will confuse the renderer when creating formatted output:

* First item in the list
* Second item in the list
- Was supposed to be the third item in the list, but markdown thinks this is a new list
- Will become the second item in the *second* list`,
        },
        {
          type: PartType.heading,
          content: 'Numbered Lists',
        },
        {
          type: PartType.text,
          content: `Numbered lists can be created with \`1.\` notation. The numbers in markdown can be incremented (e.g. \`1.\`, \`2.\`, \`3.\`) or \`1\` can be used for each item (e.g. \`1.\`, \`1.\`, \`1.\`). As with bullets, adding 4 spaces at the beginning of the line will cause that item to be a sub-item, under the one above.`,
        },
        {
          type: PartType.example,
          content: `Numbers (with periods) can be used to create numbered lists:
        
1. This is the first item in a numbered list
2. This is the second
    1. This is a sub-item
3. This is the final bullet in the list
        
Or, for simplicity:
        
1. This is the first item in a numbered list
1. This is the second, regardless of the number used in markdown`,
        },
      ],
    },
    {
      title: 'Tables',
      parts: [
        {
          type: PartType.text,
          content: `A table can be created with careful use of the \`|\` (pipe) character to delineate cells within the table. Consider the following examples:`,
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
1. A separator row of dashes
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
