import { SectionDocumentation, PartType } from '../tutorial/TutorialTypes';

export const mdMainSection: SectionDocumentation = {
  mainSection: {
    title: 'Markdown Tutorial',
    parts: [
      {
        type: PartType.text,
        content: `This text box accepts a notation called **markdown**, which is a simplified way of adding formatting to text. The text can be "rendered" into a more visual form (via the **Show Preview** button), or simply viewed with simple, text-based formatting in place.

"Standard" markdown provides for formatting like **bold**, *italics* and even ==highlighting==, and the **Devouring Scripture** app adds specialised formatting of use to the Christian (such as being able to use the name ^^^LORD^^^).
            
You might be wondering, "Do I really need to learn this 'markdown' notation?" And the answer is no, you don't! Markdown is designed such that you only need to use the parts you want, and ignore the rest.

* If all you want to do is write some text with no formatting, you can do so. 
* When you want to include multiple paragraphs you can, without having to remember any special notation.
* And if you ever decide to use italics, it's intuitive to just surround the text with asterisks, like \`*this*\`.
* If you want to highlight something you can use a similar notation \`==like this==\`. 
* If you want to create a link to a particular Bible verse, you can learn a simple notation for that (such as \`[[Mark 1]]\`), whereby Devouring Scripture will create a link to Bible Gateway

All of this is mix-and match; you can learn as much or little of markdown as you need without burdoning yourself with a huge learning endeavour.
        
**Note**: When the full-screen version of the text editor is used there is a toolbar with buttons for many of these formatting options and other markdown features.

The following sections go into more details, with examples. (Note: the examples are given as markdown boxes; in some cases you might need to scroll to see the entire example.)`,
      },
    ],
  },
  subSections: [
    {
      title: 'Text Formatting',
      parts: [
        {
          type: PartType.text,
          content: 'There are some very easy things you can do to format text as you write it, as illustrated here.',
        },
        {
          type: PartType.example,
          content: `Here are some common formatting notations you might find helpful:
          
* Text can be made bold by surrounding it with \`**double asterisks**\` or \`__double underlines__\`
* It can be italicized by surrounding it with \`*single asterisks*\` or \`_single underlines_\`
* It can be highlighted with \`==two equal signs==\`.
* The caret can be used for \`^superscript text^\`
* A "strikethrough" effect can be created by surrounding it with \`~~two tilde~~\` characters
* A link to another website (a **hyperlink**) can be created with square brackets (for the displayed text) and round brackets (for the URL), such as \`[Google](https://www.google.ca)\`
    * A URL can also simply be included on its own, and a link will be rendered; e.g. https://www.google.ca will be a link that can be clicked in the formatted output

Finally, it should be noted that some text will be made "prettier" in the formatted view. For example, quotation marks will show up as "smart 'quotation' marks," whereby the simple \`"\` and \`'\` characters become opening and closing quotation marks (no special notation is needed for this, it "just works"), and **dashes** will be rendered such that three hyphens in a row within a block of text (\`---\`) will be rendered as an m-dash and two (\`--\`) will be rendered as an n-dash.

> "I say," he said, "If I may ==highlight== that I'm being so **bold** as to *italicize* my text, writing here in the 21^st^ Century---or is it the 20^th^?---I'm also happy that my smartquotes are showing -- without me having to do anything!."`,
        },
      ],
    },
    {
      title: 'Paragraphs',
      parts: [
        {
          type: PartType.text,
          content: `No special formatting is required to create paragraphs; pressing *Enter* two (or more) times at the end of a line will create paragraphs as expected. For example:`,
        },
        {
          type: PartType.example,
          content: `This is one paragraph.
            
This is another.
        
        
        
        
        
And this is a third, regardless of how many empty lines came before it!`,
        },
      ],
    },
    {
      title: 'Block Quotes',
      parts: [
        {
          type: PartType.text,
          content: `When quoting large sections of text a **blockquote** section can be used. Blockquotes format the quoted text differently from other text by indenting it and placing a slight border to the left. For example:`,
        },
        {
          type: PartType.example,
          content: `Starting a paragraph with \`> \` (that is, a greater than sign followed by a space) makes it a blockquote:

> This is a **quotation**`,
        },
        {
          type: PartType.text,
          content:
            'Notice that formatting works within the blockquote, so bold, italics, and other formatting notations can still be used.',
        },
        {
          type: PartType.text,
          content: `Quotes will sometimes break across multiple lines; it's up to the author whether to include the \`> \` before each line or not.`,
        },
        {
          type: PartType.example,
          content: `> This quote has
> multiple lines

is equivalent to

> This quote has
multiple lines

However, as soon as a **paragraph break** is formed (i.e. multiple newlines), the \`> \` will be needed between paragraphs to continue the blockquote section.

> This quote spans multiple paragraphs.
> 
> It's quite neat.`,
        },
        {
          type: PartType.text,
          content: `Blockquotes can also be **nested**, for cases where a quotation *itself* includes a quotation. Each new level of quotation gets a new \`> \` inserted, so \`> \` is one level of quotation, and \`> > \` is two levels.`,
        },
        {
          type: PartType.example,
          content: `A favourite author of mine once said:
          
> A great man once said:
> 
> > Do your thing, bro.`,
        },
      ],
    },
    {
      title: 'Headings',
      parts: [
        {
          type: PartType.text,
          content: `Headings can be created by using \`#\` characters at the beginning of a line: one \`#\` for the largest heading, two for a smaller one, and three for a smaller one still:`,
        },
        {
          type: PartType.example,
          content: `# This is the biggest heading
And some normal text
## This is the second biggest heading
And some more normal text
### This is the third biggest heading
With some final normal text`,
        },
        {
          type: PartType.text,
          content: "The number of empty lines between the headings don't make a difference. For example:",
        },
        {
          type: PartType.example,
          content: `### A heading
A paragraph under that heading
### Another heading
        
        
Another paragraph, under the second heading`,
        },
        {
          type: PartType.text,
          content: `Multiple blocks of text can also be separated by a horizontal line (called a **horizontal rule** in HTML, using the \`<hr>\` tag), by putting three hyphens on their own line.`,
        },
        {
          type: PartType.example,
          content: `This is a paragraph---even though it contains some dashes---and will show up normally.
          
---

This paragraph will show up after the line.`,
        },
        {
          type: PartType.text,
          content: 'Notice that the `---` sequence must be on its own, or else it will be treated like an m-dash.',
        },
      ],
    },
    {
      title: 'Lists and Bullets',
      parts: [
        {
          type: PartType.text,
          content:
            'Bulleted lists can be created by putting an asterisk (`*`) or hyphen (`-`), followed by a space, at the beginning of the line for each item in the list. Similarly, numbered lists can be created with `1.` notation. Adding 4 spaces at the beginning of the line (before the `*` or `-` or `1.`) will cause that item to be a sub-item, under the one above.',
        },
        {
          type: PartType.example,
          content: `Asterisks can be used to create bulleted lists:
            
* This is the first item in a bulleted list.
* This is the second
    * This is a sub-bullet
* This is a *final* bullet in the list---and additional asterisks (such as for italics) are fine within the text of the bullet; it won't confuse the formatting
        
Numbers (with periods) can be used to create numbered lists:
        
1. This is the first item in a numbered list
2. This is the second
    1. This is a sub-item
3. This is the final bullet in the list
        
The numbers in a numbered list don't need to be properly in order; for simplicity, some just use \`1.\` for each item:
        
1. This is the first item in a numbered list
1. This is the second, regardless of the number used in markdown`,
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
      ],
    },
    {
      title: 'Tables',
      parts: [
        {
          type: PartType.text,
          content: `A table can be created with careful use of the \`|\` (pipe) character to delineate cells within the table. Consider the following examples, where header rows are created for the table followed by "normal" rows:`,
        },
        {
          type: PartType.example,
          content: `Tables are created with | characters, along with - characters to delineate the headings.
            
| Person | Score |
|--|--|
| Suresh | 15 |
| Samantha | 20 |
        
If desired, the spacing can be made more precise; it won't change the resultant formatted view, but sometimes helps with readability in markdown format:
        
| Person   | Score |
|----------|-------|
| Suresh   | 15    |
| Samantha | 20    |

Both of these tables will look the same in the formatted output, even though the second is "prettier" in raw markdown`,
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
          type: PartType.text,
          content: `Notice the three parts of the table:
          
1. Header cells for the table come at the top
1. A separator row of dashes
1. As many rows as desired of cells for the body of the table.

In most cases that second row of dashes appears purely so that markdown can separate the header from the other cells, but they can also be used to control alignment for the column:

* Putting a colon at the beginning of the dashes such as \`:--\` will cause the text to be left justified (which is also the default)
* Putting a colon on either end of the dashes such as \`:--:\` will cause the text to be centred
* Putting a colon at the end of the dashes such as \`--:\` will cause the text to be right justified.

| Left | Centre | Right |
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
            'In the formatted output, notice that the footnotes show up at the very bottom, regardless of where they were placed in the markdown text. In addition, the footnote reference is rendered as a link, which the user can click to go to the text of the actual footnote, and there is another link at the end of the footnote text to bring the reader back to the original spot in the text where the footnote reference resided. (This is typically only useful for very large amounts of text, where the reader might have a lot of scrolling to do, but the links are created regardless.)',
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
