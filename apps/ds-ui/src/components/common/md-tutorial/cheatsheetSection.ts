import { SectionDocumentation, PartType } from '../tutorial/TutorialTypes';

export const mdCheatsheetSection: SectionDocumentation = {
  mainSection: {
    title: 'Cheat Sheet',
    parts: [
      {
        type: PartType.text,
        content: `This section will give some quick reminders on how to use the most common markdown notations.`,
      },
    ],
  },
  subSections: [
    {
      title: 'Text Formatting',
      parts: [
        {
          type: PartType.text,
          content: `A few simple notations provide 90% of what you might want to do with markdown.
                
| Notation | Syntax |
| --- | --- |
| **Bold** text | \`**Bold** text\` or \`__Bold__ text\` |
| *Italicised* text | \`*Italicised* text\` or \`_Italicised_ text\` |
| ==Highlighted== text | \`==Highlighted== text\` |
| Superscript: 1^st^ | \`Superscript: 1^st^\` |
| UPPERCASE (if user setting **on**) | \`UPPERCASE\` (no special notation necessary) |
| UPPERCASE (if user setting **off**) | \`^^^UPPERCASE^^^\` |
| Era: 2020^^A.D.^^ (if user setting **on**) | \`2020AD\` or \`2020A.D.\` (no special notation necessary) |
| Era: 2020^^A.D.^^ (if user setting **off**) | \`2020^^A.D.^^\` |
| ^-^Small Caps^-^ | \`^-^Small Caps^-^\` |`,
        },
      ],
    },
    {
      title: 'Emoji',
      parts: [
        {
          type: PartType.example,
          content: `Can emoji be included? 🤔 They sure can! 😀`,
        },
      ],
    },
    {
      title: 'Paragraphs',
      parts: [
        {
          type: PartType.example,
          content: `No special formatting is required for paragraphs.

Leaving multiple lines between will create two paragraphs.`,
        },
      ],
    },
    {
      title: 'Links',
      parts: [
        {
          type: PartType.example,
          content: `A link to [Google](https://www.google.ca) and a link to the Bible Gateway to [|Acts 2:1|]`,
        },
      ],
    },
    {
      title: 'Headings',
      parts: [
        {
          type: PartType.example,
          content: `# Heading 1
normal text
## Heading 2
normal text
### Heading 3
normal text`,
        },
      ],
    },
    {
      title: 'Separators',
      parts: [
        {
          type: PartType.example,
          content: `Three hyphens will create a horizontal line between paragraphs.
                
---

A line is above this paragraph.`,
        },
      ],
    },
    {
      title: 'Quotes',
      parts: [
        {
          type: PartType.example,
          content: `For a normal quotation:

> this is a quotation
> 
> > quotations can be nested
> 
> this is the first quotation

For a Scripture quotation, such as Ps 1:1:

|> 1 Blessed is the man
|> |>    who walks not in the counsel of the wicked,
|> nor stands in the way of sinners,
|> |>    nor sits in the seat of scoffers;`,
        },
      ],
    },
    {
      title: 'Lists',
      parts: [
        {
          type: PartType.example,
          content: `* bullet 1
* bullet 2
  * sub-bullet
* bullet 3

1. Numbered item 1
1. Numbered item 2
    1. sub-item
1. Numbered item 3`,
        },
      ],
    },
    {
      title: 'Ignore Formatting',
      parts: [
        {
          type: PartType.example,
          content: `Surrounding text with back ticks will cause formatting to be ignored (in markdown this is called a **code** section), and it will be printed with a fixed with font, such as \`*This* text.\`
          
Longer blocks of text can similarly have the formatting "ignored" by placing it within a **code block** like this:

\`\`\`
*This* text has what **looks** like formatting, but it will not be ==formatted==.
\`\`\``,
        },
      ],
    },
  ],
};
