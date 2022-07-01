import { SectionDocumentation, PartType } from '../tutorial/TutorialTypes';

export const specialMarkupSection: SectionDocumentation = {
  mainSection: {
    title: 'Special Markdown',
    parts: [
      {
        type: PartType.text,
        content: `All of the examples given so far are for "standard" markdown notation; anyone familiar with markdown would be familiar with the examples given, even if some (such as footnotes) might be less common than others (such as bold and italics). **Devouring Scripture** has also introduced some special notations that can be used specifically for the kind of text that often gets used in Christian contexts.`,
      },
    ],
  },
  subSections: [
    {
      title: 'Links to the Bible Gateway',
      parts: [
        {
          type: PartType.text,
          content: `As mentioned above, **hyperlinks** can be created the normal \`[Hyperlink text](hyperlinkUrl)\` markdown notation, but for **Devouring Scripture** it's assumed that a common pattern will be the creation of links to specific passages of Scripture, using the **Bible Gateway** website. For this reason, a special notation was created in the format \`[[Reference]]\`. There are a few options that can be provided for creating these links.
            
For example, a simple link can be created by surrounding a Bible reference with \`[[\` and \`]]\` notation, such as:`,
        },
        {
          type: PartType.example,
          content: 'A link to [[Rom 1]]',
        },
        {
          type: PartType.text,
          content: `This is a nice, compact notation in the markdown notation, but, as shown, a number of enhancements are made when the link is rendered into the formatted version:
* A small cross icon is appended, to illustrate that this link goes specifically to the **Bible Gateway** for a passage of scripture, as opposed to a "normal" link
* The reference is expanded to a more longform notation
* The specific version of the Bible that's being used is appended in parentheses. As shown, the ESV version is used, if no other version is specified.

When a specific version is desired, it can be specified as follows:`,
        },
        {
          type: PartType.example,
          content: 'A link to [[Rom 1]NIV]',
        },
        {
          type: PartType.text,
          content:
            "Any version can be used; **Devouring Scripture** won't validate the version, however, it will just pass it on to **Bible Gateway**, so `[[Rom 1]ABC]` would create the link as normal, but clicking the link would prompt an error from **Bible Gateway**.",
        },
        {
          type: PartType.text,
          content:
            'In case different text is desired to be shown to the reader, that can be added in parentheses, after the passage.',
        },
        {
          type: PartType.example,
          content: 'A link to [[Rom 1:1 (verse 1)]] of Romans 1',
        },
        {
          type: PartType.text,
          content:
            'Other options can be specified by placing a `;` after the version (or before the final `]` if no version is specified). The only option currently available is `s` (for "short"), which specifies that the reference shouldn\'t be expanded into a more readable form.',
        },
        {
          type: PartType.example,
          content: 'A link to [[Rom 1]ESV;s].',
        },
        {
          type: PartType.text,
          content: 'Of course, these can all be combined together in the same text/note:',
        },
        {
          type: PartType.example,
          content: `It says in [[Rom 1:1]NIV] that Paul is an Apostle, even though he wasn't one of the *original* Apostles (as called out in [[Matt 10:5-15]ESV;s] or [[Mark 3:13-21 (Mark 3)]NIV] or ==other examples==.)
            
If you're interested, the **Apostles' Creed** can be found at the [Christian Reformed Church website](https://www.crcna.org/welcome/beliefs/creeds/apostles-creed)`,
        },
      ],
    },
    {
      title: 'All Capitalized Words/Names',
      parts: [
        {
          type: PartType.text,
          content: `Some words---especially proper names---appear in all capital letters in the Scriptures; the most common example is the name of the ^^^LORD^^^ in Old Testament Scriptures. For readability, these words are often written in **Small Caps**, as was used here, where the first letter is larger than the other letters, even though they're all capitalized. For the Christian, these words should always be in all uppercase, even if they're formatted differently.
          
Surrounding text with three carets (such as \`^^^LORD^^^\`) will cause it to be rendered similar to ^^^LORD^^^; in the markdown the letters will be all uppercase, on devices that don't support advanced formatting it will also be all uppercase, and on devices that support more advanced formatting it will be rendered in all uppercase in Small Caps format.
            
For example:`,
        },
        {
          type: PartType.example,
          content: `The ^^^LORD GOD^^^ is good.`,
        },
      ],
    },
    {
      title: 'Smaller (but still capitalized) Terms',
      parts: [
        {
          type: PartType.text,
          content: `This is similar to the case of all capitalized words, except that all of the letters are rendered in the smaller capitalized versions. For this notation two carets are used instead of three (e.g. \`^^A.D.^^\`) The best examples are the terms ^^A.D.^^ and ^^B.C.^^. For example:`,
        },
        {
          type: PartType.example,
          content: `From 1500^^B.C.^^ through to 2022^^A.D.^^ is a long time.`,
        },
        {
          type: PartType.text,
          content:
            'Just like with the `^^^` notation, the text is always in all capitals, and only on devices that support the advanced formatting will the capitalized letters be smaller.',
        },
      ],
    },
    {
      title: 'Small Caps',
      parts: [
        {
          type: PartType.text,
          content:
            'Text can be rendered as normal ^-^Small Caps^-^ by surrounding it with `^-^` notations, such as `^-^This Is Small Caps^-^`. This is not a common markdown notation. For example:',
        },
        {
          type: PartType.example,
          content: `This text includes an example of ^-^Small Caps^-^ in it.`,
        },
        {
          type: PartType.text,
          content:
            "Small Caps would be used in cases where it's fine for the text to be in lowercase letters, in some instances; when people reading the markdown, or on devices that don't support advanced formatting, can see the text in lowercase (as opposed to the name of the ^^^LORD^^^ as written in Old Testament Scriptures, which should be capitalized).",
        },
      ],
    },
    {
      title: 'Biblical Quotations',
      parts: [
        {
          type: PartType.text,
          content: `Standard markdown blockquotes (discussed above) can, of course, be used for quoting large sections of Scripture, or a special notation using \`|>\` instead of \`>\` can be used, which works the same as regular blockquotes but verse numbers will also be made **superscript** automatically.`,
        },
        {
          type: PartType.example,
          content: `It says in [[John 1:1-5]]:
          
|> 1 In the beginning was the Word, and the Word was with God, and the Word was God. 2 He was in the beginning with God. 3 All things were made through him, and without him was not any thing made that was made. 4 In him was life, and the life was the light of men. 5 The light shines in the darkness, and the darkness has not overcome it.`,
        },
        {
          type: PartType.text,
          content: `In order for the verse formatting to work, verse numbers have to be surrounded by whitespace (to distinguish verse numbers from any other text that has numbers in it); if the formatting is not working as desired, it may be easier to use standard blockquotes, and manually use \`^2^\` notation to make numbers superscript.`,
        },
        {
          type: PartType.example,
          content: `Because of the spacing, this works:
          
|> 1 some 2 text

and this doesn't:

|> 1some 2text

and this partially does:

|> 1 some 2text

Standard blockquotes can always be used, allowing for more control over spacing:

> ^1^ In the beginning was the Word, and the Word was with God, and the Word was God. ^2^ He was in the beginning with God. ^3^ All things were made through him, and without him was not any thing made that was made. ^4^ In him was life, and the life was the light of men. ^5^ The light shines in the darkness, and the darkness has not overcome it.`,
        },
        {
          type: PartType.text,
          content: `Where the special \`|>\` notation comes in especially handy is with Biblical **poetry**, especially when it comes to indentation. When quoting a block of poetry, multiple levels of indentation can be achieved by having multiple levels of \`|>\` notation, such as:`,
        },
        {
          type: PartType.example,
          content: `We read in [[Psalm 1:1-2]ESV]:

|> 1 Blessed is the man
|> |> who walks not in the counsel of the wicked,
|> nor stands in the way of sinners,
|> |> nor sits in the seat of scoffers;
|> 2 but his delight is in the law of the ^^^LORD^^^,
|> |> and on his law he meditates day and night.`,
        },
        {
          type: PartType.text,
          content: `As illustrated above, it might be easiest to include the \`|>\` before each and every line in the stanza, to more easily differentiate between 1st level lines (\`|>\`) and second level lines (\`|> |>\`).`,
        },
        {
          type: PartType.text,
          content: `Because of the way spaces are ignored within this notation, you can, if you wish, clean up the way the text is typed into the markdown box, without impacting the way the formatted version is rendered. For example:`,
        },
        {
          type: PartType.example,
          content: `We read in [[Psalm 1:1-2]ESV]:

|>      1 Blessed is the man
|> |>      who walks not in the counsel of the wicked,
|>      nor stands in the way of sinners,
|> |>      nor sits in the seat of scoffers;
|>      2 but his delight is in the law of the ^^^LORD^^^,
|> |>      and on his law he meditates day and night.`,
        },
        {
          type: PartType.text,
          content: `As illustrated, the extra spaces before each line don't impact the way the text is finally rendered, as long as the proper number of \`|>\` headings come at the beginning of each line.`,
        },
      ],
    },
  ],
};
