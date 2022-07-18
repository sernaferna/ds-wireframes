import { SectionDocumentation, PartType } from '../tutorial/TutorialTypes';

export const specialMarkupSection: SectionDocumentation = {
  mainSection: {
    title: 'Special Markdown',
    parts: [
      {
        type: PartType.text,
        content: `All of the examples given so far are for "standard" markdown notation; anyone familiar with markdown would be familiar with the examples given, even if some (such as footnotes) might be less common than others (such as bold and italics). **Devouring Scripture** has also introduced some special notations that can be used specifically for the kind of text that often gets created in Christian contexts.`,
      },
    ],
  },
  subSections: [
    {
      title: 'Special Formatting for Christian Use: Words in UPPERCASE',
      parts: [
        {
          type: PartType.text,
          content: `Markdown provides a number of options for **formatting text**, such as bold and italics and even highlighting. **Devouring Scripture** provides a number of special formatting of interest to writing about (and quoting) Scripture. First is the case of words (often, but not always, proper names) that appear in the Scriptures in all capital letters. The most common example is the personal name of God in Old Testament Scriptures, usually written as \`LORD\` but often formatted as ^^^LORD^^^ -- that is, in **Small Caps**, for readability. For the Christian, these words should always be in all uppercase, even if they're formatted differently on the screen/page.

By default, any words written \`ALL IN UPPERCASE\` will be rendered as Small Caps, with the first letter of each word being larger than the rest. In the markdown the letters will be all uppercase, on devices that don't support advanced formatting it will also be all uppercase, and on devices that support more advanced formatting it will be rendered in all uppercase in Small Caps format.
            
For example:`,
        },
        {
          type: PartType.example,
          content: `[|Rev 11:17|KJV] says:
          
|> Saying, We give thee thanks, O LORD God Almighty, which art, and wast, and art to come; because thou hast taken to thee thy great power, and hast reigned.

which relates back to [|Ps 2:2|ESV], which says:

|> 2 The kings of the earth set themselves,
|> |> and the rulers take counsel together,
|> |> against the LORD and against his Anointed, saying,`,
        },
        {
          type: PartType.text,
          content: `This behaviour is controlled by a setting (under the **Settings** sidebar in the **Write** page), so it can be turned off if desired. Whether the behaviour is on or off by default, it can also be manually accomplished by surrounding text with \`^^^\` notation. For example:`,
        },
        {
          type: PartType.example,
          content: `The word UPPER may or may not render as small caps depending on the setting, but the words ^^^ALWAYS UPPER^^^ will render as small caps, regardless of the setting.`,
        },
      ],
    },
    {
      title: 'Special Formatting for Christian Use: Writing Eras for Dates',
      parts: [
        {
          type: PartType.text,
          content: `Another example of this type of formatting is for cases where the **era** is being specified for a date; for example, the year 100^^B.C.^^. The **era** (\`A.D.\`, \`B.C.\`, \`C.E.\`, or \`B.C.E.\`) is often written in small capitals.
          
The same as with words that show up all in uppercase, Devouring Scripture will attempt to recognize era notation in text (also controllable by a global setting), and render it appropriately. For example:`,
        },
        {
          type: PartType.example,
          content: `The year AD2020 was a rough one around the world because of the pandemic, but there was an even worse pandemic around 3000BC in China.`,
        },
        {
          type: PartType.text,
          content: `If the setting is turned off, or if the same formatting is desired for other text, the \`^^\` notation can be used (two carets instead of three).`,
        },
        {
          type: PartType.example,
          content: `Text can be renered in small Small Caps by ^^SURROUNDING WITH TWO CARETS^^.`,
        },
      ],
    },
    {
      title: 'Links to the Bible Gateway',
      parts: [
        {
          type: PartType.text,
          content: `As mentioned above, **hyperlinks** can be created the standard \`[Hyperlink text](hyperlinkUrl)\` markdown notation, but for **Devouring Scripture** it's assumed that a common pattern will be the creation of links to passages of Scripture using the **Bible Gateway** website. For this reason, a special notation was created in the format \`[|Reference|]\`.`,
        },
        {
          type: PartType.example,
          content: 'A link to [|Rom 1|]',
        },
        {
          type: PartType.text,
          content: `This is a nice, compact notation in markdown, but, as shown, a number of enhancements are made when the link is rendered into the formatted version:
* A small cross icon is appended, to illustrate that this link goes specifically to the **Bible Gateway** for a passage of scripture, as opposed to a "normal" link
* The reference is expanded to a longform notation
* The specific version of the Bible that's being used is appended in parentheses.

*Other notations were considered, such as \`[[REF]]\` or \`||REF||\`, but these notations might have caused confusion with other flavours of markdown. For example, the \`[[link]]\` notation is often used in wikis for in-wiki links, and \`||some text||\` is used for "spoilers" on some sites (e.g. Discord). So \`[|REF|]\` was deemed the least confusing, in a larger context.*`,
        },
        {
          type: PartType.text,

          content: `As shown, \`ESV\` is the default version used, but when a specific version is desired, it can be specified as follows:`,
        },
        {
          type: PartType.example,
          content: 'A link to [|Rom 1|NIV]',
        },
        {
          type: PartType.text,
          content: `Any version supported by Bible Gateway can be used. 
            
**Devouring Scripture** won't *validate* the version, however, it will just pass it on to **Bible Gateway** as specified in the markdown, so something like \`[|Rom 1|ABC]\` would create the link as normal, but clicking the link would prompt an error from **Bible Gateway** because it doesn't recognize a version of the Bible named \`ABC\`.`,
        },
        {
          type: PartType.text,
          content:
            'In case different text is desired to be shown to the reader, it can be added in parentheses after the passage but before the second pipe.',
        },
        {
          type: PartType.example,
          content: 'A link to [|Rom 1:1 (verse 1)|] of Romans 1',
        },
        {
          type: PartType.text,
          content:
            'Other options can be specified by placing a `;` after the version (or before the final `]` if no version is specified). The only option currently available is `s` (for "short"), which specifies that the reference shouldn\'t be expanded into a more readable form, as long as it\'s valid.',
        },
        {
          type: PartType.example,
          content: 'A shortened link to [|Rom 1|ESV;s] as opposed to the longer version from [|Rom 1]|ESV].',
        },
        {
          type: PartType.text,
          content: 'Of course, these can all be combined together in the same text/note:',
        },
        {
          type: PartType.example,
          content: `It says in [|Rom 1:1|NIV] that Paul is an Apostle, even though he wasn't one of the *original* Apostles (as called out in [|Matt 10:5-15|ESV;s] or [|Mark 3:13-21 (Mark 3)|NIV] or ==other examples==.)
            
If you're interested, the **Apostles' Creed** can be found at the [Christian Reformed Church website](https://www.crcna.org/welcome/beliefs/creeds/apostles-creed)`,
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
          content: `Standard markdown blockquotes (discussed above) can, of course, be used for quoting passages of Scripture, but a special notation using \`|>\` instead of \`>\` can be used instead, which works the same as regular blockquotes but verse numbers will also be made **superscript** automatically.`,
        },
        {
          type: PartType.example,
          content: `It says in [|John 1:1-5|]:
          
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

Standard blockquotes can always be used, allowing for more control over spacing. The \`^\` character can be used for superscript for verse numbers, if desired.

> ^1^ In the beginning was the Word, and the Word was with God, and the Word was God. ^2^ He was in the beginning with God. ^3^ All things were made through him, and without him was not any thing made that was made. ^4^ In him was life, and the life was the light of men. ^5^ The light shines in the darkness, and the darkness has not overcome it.`,
        },
        {
          type: PartType.text,
          content: `Where the special \`|>\` notation comes in especially handy is with Biblical **poetry**, especially when it comes to indentation. When quoting a block of poetry, multiple levels of indentation can be achieved by having multiple levels of \`|>\` notation, such as:`,
        },
        {
          type: PartType.example,
          content: `We read in [|Psalm 1:1-2|]:

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
          content: `Spaces at the beginning of the line are ignored within this notation, which allows the author to clean up the way the text is typed into the markdown box (if desired), without impacting the way the formatted version is rendered. For example:`,
        },
        {
          type: PartType.example,
          content: `We read in [|Psalm 1:1-2|ESV]:

|>      1 Blessed is the man
|> |>      who walks not in the counsel of the wicked,
|>      nor stands in the way of sinners,
|> |>   nor sits in the seat of scoffers;
|>      2 but his delight is in the law of the ^^^LORD^^^,
|> |>      and on his law he meditates day and night.`,
        },
        {
          type: PartType.text,
          content: `As illustrated, the extra spaces before each line don't impact the way the text is finally rendered, as long as the proper number of \`|>\` headings come at the beginning of each line. In the example above, the author forgot to put extra spaces at the beginning of the 4^th^ line, but because the right number of \`|> |>\` entries were included it still renders correctly in the formatted version.`,
        },
      ],
    },
  ],
};
