import { SectionDocumentation, PartType } from '../tutorial/TutorialTypes';

export const mdMainSection: SectionDocumentation = {
  mainSection: {
    title: 'Markdown Tutorial',
    parts: [
      {
        type: PartType.text,
        content: `This text box accepts a notation called **markdown**, which is a simplified way of adding formatting to text. The text can be "rendered" into a more visual form (via the **Show Preview** button), or simply viewed with simple, text-based formatting in place.

"Standard" markdown provides for formatting like **bold**, *italics* and even ==highlighting==, and the **Devouring Scripture** app adds specialised formatting of use to the Christian (such as being able to use the name ^^^LORD^^^).
            
You might be wondering, "Do I really need to learn this 'markdown' notation?" And the answer is no, you don't! Markdown is designed such that you only need to use the parts you want; if all you want to do is write some text with no formatting, you can! But if you want to include multiple paragraphs you can, without having to think too much about it; and if you ever decide to use italics you can learn the very simple notation for doing so; and if you want to create a link to a particular Bible verse, you can learn the simple notation for that; and if you want to highlight something, to come back to later, you can. You can learn just the parts of markdown you need, as you need them, without burdoning yourself with a huge learning endeavour.
        
**Note**: When the full-screen version of the text editor is used there is a toolbar with buttons for many of these formatting options and other markdown features.`,
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
          content: `Text can be made bold by surrounding it with **double asterisks** or __double underlines__. Italics can be applied by surrounding text with *single asterisks* or _single underlines_. Highlighting can be applied by surrounding it with ==two equal signs==.
            
The caret can be used for superscript text (such as in 21^st^ Century).
        
A "strikethrough" effect can be created by surrounding it with ~~two tilde~~ characters.
        
A hyperlink to another website can be created with square and round brackets; for example, a link to [Google](https://www.google.ca), where the square brackets are the text that will be displayed and the round brackets contain the URL for the link. A URL can also simply be included on its own, and a link will be rendered; e.g. https://www.google.ca will be a link that can be clicked in the formatted output.

Finally, while no special markup is needed, it should be noted that some text will be made "prettier" in the formatted view. For example, quotation marks will show up as "smart 'quotation' marks," whereby the simple \`"\` and \`'\` characters become opening and closing quotation marks. Also, **dashes** will be rendered nicely; so those who like to use **m-dashes**---like this---will get nicely formatted dashes, as will those who prefer **n-dashes** -- like this.`,
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
          content: `When quoting large sections of text, a **blockquote** section can be used. Blockquotes format the quoted text differently from other text, by indenting it further than regular text and placing a slight border to the left. For example:`,
        },
        {
          type: PartType.example,
          content: `Starting a paragraph with \`> \` (that is, a greater than sign followed by a space) makes it a blockquote:

> This is a quotation`,
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

However, as soon as a **paragraph break** is formed (i.e. multiple newlines), the \`> \` will be needed between.

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
          content: `Headers can be created by using \`#\` characters at the beginning of the heading: one \`#\` for the largest heading, two for a smaller one, and three for a smaller one still:`,
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
      ],
    },
    {
      title: 'Lists and Bullets',
      parts: [
        {
          type: PartType.text,
          content:
            'Numbered and bulleted lists can be created by putting an asterisk or number at the beginning of each item in the list. Asterisks will create bullets, and numbers will create a numbered list.',
        },
        {
          type: PartType.example,
          content: `Asterisks can be used to create bulleted lists:
            
* This is the first item in a bulleted list.
* This is the second
    * This is a sub-bullet
* This is a final bullet in the list
        
Numbers (with periods) can be used to create numbered lists:
        
1. This is the first item in a numbered list
2. This is the second
    1. This is a sub-item
3. This is the final bullet in the list
        
The numbers in a numbered list don't need to be properly in order; for simplicity, some just use \`1.\` for each item:
        
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
          content: `A table can be created with careful use of the \`|\` (pipe) character. Consider the following examples, headers are created for the table followed by two "normal" rows:`,
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
| Samantha | 20    |`,
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
            'In the formatted output, notice that the footnotes show up at the very bottom, regardless of where they were placed in the markdown text.',
        },
        {
          type: PartType.text,
          content:
            "The actual numbering used in the markdown doesn't matter, they will be rendered in the order they're found, as long as the number in the footnote reference and the number in the footnot itself match:",
        },
        {
          type: PartType.example,
          content: `This text includes[^2] a couple[^1] of footnotes.
            
[^2]: This is the first footnote
    
[^1]: This is the second`,
        },
      ],
    },
  ],
};
