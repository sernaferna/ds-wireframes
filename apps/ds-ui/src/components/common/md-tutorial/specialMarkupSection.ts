import { SectionDocumentation, PartType } from '../tutorial/TutorialTypes';

export const specialMarkupSection: SectionDocumentation = {
  mainSection: {
    title: 'Advanced Notation: Markdown for the Scriptures',
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
          content: `This was mentioned in the cheat sheet, but it's worth revisiting here.
          
Scripture sometimes contains words that appear \`IN ALL CAPITAL LETTERS\` (often, but not always, proper names, such as the name of the ^^^LORD^^^). In printed Bibles, and on some websites, such text is often formatted as ^^^SMALL CAPS^^^ for readability. For the Christian, these words should always be in all uppercase, even if they're formatted differently on the screen/page.

**Devouring Scripture** uses ^-^Small Caps^-^ where possible. By default, any words written \`ALL IN UPPERCASE\` will be rendered as ^^^SMALL CAPS^^^, with the first letter of each word being larger than the rest. No special notation is needed, the app will just format any words it finds in all uppercase. In the markdown the letters will be all uppercase, on devices that don't support advanced formatting it will also be all uppercase, and on devices that support more advanced formatting it will be rendered in ^^^SMALL CAPS^^^ format.
            
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
          type: PartType.heading,
          content: 'Manual vs. Automatic',
        },
        {
          type: PartType.text,
          content: `This behaviour is controlled by a setting, so it can be turned off if desired. Whether the setting is on or off the formatting can be manually applied by surrounding text with \`^^^\` notation. For example:`,
        },
        {
          type: PartType.example,
          content: `The word UPPER may or may not render as small caps depending on the setting, but the words ^^^ALWAYS UPPER^^^ will render as small caps, regardless of the setting.`,
        },
        {
          type: PartType.text,
          content: `Text surrounded with the \`^^^\` notation doesn't *have* to be written all in uppercase---the text \`^^^this is some text^^^\` will still render as ^^^this is some text^^^---however, the usual intent is to use this type of formatting for text that's all uppercase in the original, such as the name of the ^^^LORD^^^ in Old Testament Scriptures.`,
        },
      ],
    },
    {
      title: 'Special Formatting for Christian Use: Writing Eras for Dates',
      parts: [
        {
          type: PartType.text,
          content: `Another example of this type of formatting is for cases where the **era** is being specified for a date; for example, the year 100^^B.C.^^. The **era** (\`A.D.\`, \`B.C.\`, \`C.E.\`, or \`B.C.E.\`) is often written in small capitals. (That is, ^^^SMALL CAPS^^^, but where all of the letters are the small version of ^^SMALL CAPS^^.)
          
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
        {
          type: PartType.text,
          content: `When using the \`^^\` notation the text in markdown doesn't need to be uppercase, so \`^^a.d.^^\` will still be shown as ^^A.D.^^, but the notation is *usually* used for text that is all uppercase.`,
        },
      ],
    },
    {
      title: 'Links to the Bible Gateway',
      parts: [
        {
          type: PartType.text,
          content: `As mentioned above, **hyperlinks** can be created the standard \`[Hyperlink text](hyperlinkUrl)\` markdown notation, and **Devouring Scripture** introduces a notation specifically for the creation of links to passages of Scripture (using the **Bible Gateway** website), in the format \`[|Reference|]\`.`,
        },
        {
          type: PartType.example,
          content: 'A link to [|Rom 1:32-2:4|]',
        },
        {
          type: PartType.text,
          content: `This is a nice, compact notation in markdown, but, as shown, a number of enhancements are made when the link is rendered into the formatted version:
* A small cross icon is appended to highlight that this link goes specifically to the **Bible Gateway** for a passage of scripture, as opposed to a "normal" link
* The reference is expanded to a longform notation
* The specific version of the Bible that's being used is appended in parentheses (in this case using the user's default version)

*Other notations were considered, such as \`[[REF]]\` or \`||REF||\`, but these notations might have caused confusion with other flavours of markdown. For example, the \`[[link]]\` notation is often used in wikis for in-wiki links, and \`||some text||\` is used for "spoilers" on some sites (e.g. Discord). So \`[|REF|]\` was deemed the least confusing, in the larger context of the web.*`,
        },
        {
          type: PartType.heading,
          content: 'Specifying the Version',
        },
        {
          type: PartType.text,

          content: `As mentioned, the user's default Bible version is used by default, but a specific version can be specified as follows:`,
        },
        {
          type: PartType.example,
          content: 'A link to [|Rom 1|NIV]',
        },
        {
          type: PartType.text,
          content: `Any version supported by Bible Gateway can be used but keep in mind that **Devouring Scripture** won't *validate* it, any version specified will be passed to **Bible Gateway** as-is. So something like \`[|Rom 1|ABC]\` would create the link as normal, using the version \`ABC\`, but clicking the link would prompt an error from **Bible Gateway** because it doesn't recognize a version of the Bible named \`ABC\`.`,
        },
        {
          type: PartType.heading,
          content: 'Specifying the Resultant Text',
        },
        {
          type: PartType.text,
          content:
            'In case different text is desired to be shown to the reader when the formatted text is rendered, it can be added in parentheses after the passage but before the second pipe.',
        },
        {
          type: PartType.example,
          content:
            'A link to [|Rom 1:1 (verse 1)|] of Romans 1, or [|John 3:16 (the most popular verse in the Bible)|]',
        },
        { type: PartType.heading, content: 'Other Options' },
        {
          type: PartType.text,
          content: `Other options can be specified by placing a \`;\` after the version (if specified) and specifying the options before the final \`]\`. 
            
The only option currently available is \`s\` (for "short"), which specifies that the reference should not be expanded into a more readable form, as long as it's valid.`,
        },
        {
          type: PartType.example,
          content:
            'We can include a long link to A link to [|Rom 1:32-2:4|] or a shortened link to A link to [|Rom 1:32-2:4|;s]',
        },
        {
          type: PartType.heading,
          content: 'Invalid References',
        },
        {
          type: PartType.text,
          content: `Although **Devouring Scripture** doesn't validate Bible versions, it *does* validate the **reference** specified. If the reference isn't valid, the link won't be created the the text will just be left alone.`,
        },
        {
          type: PartType.example,
          content: `The link to [|Ex 5:1|] will work, but [|Blah 5:1|] won't because \`Blah\` isn't a valid book in the Bible, and [|Rev 23|] won't work either because Revelations only has 22 chapters.`,
        },
        {
          type: PartType.heading,
          content: 'Mixing and Matching',
        },
        {
          type: PartType.text,
          content:
            'All of these approaches and notations for creating **Bible Gateway** links can be mixed and matched in text as desired:',
        },
        {
          type: PartType.example,
          content: `It says in [|Rom 1:1|NIV] that Paul is an Apostle, even though he wasn't one of the *original* Apostles (as called out in [|Matt 10:5-15|ESV;s] or [|Mark 3:13-21 (Mark 3)|NIV] or ==other examples==.)
            
If you're interested, the **Apostles' Creed** can be found at the [Christian Reformed Church website](https://www.crcna.org/welcome/beliefs/creeds/apostles-creed)`,
        },
      ],
    },
    {
      title: 'Biblical Quotations',
      parts: [
        {
          type: PartType.text,
          content: `Standard markdown blockquotes (discussed above) can, of course, be used for quoting passages of Scripture, but a special notation using \`|>\` instead of \`>\` can be used instead, which works the same as regular blockquotes but with some important additions specific to quoting Scripture.`,
        },
        {
          type: PartType.example,
          content: `To quote King David:
          
|> (Ps 1:1-2) 1 Blessed is the man
|> |>  who walks not in the counsel of the wicked,
|> nor stands in the way of sinners,
|> |>  nor sits in the seat of scoffers;
|> 2 but his delight is in the law[b] of the LORD,
|> |>  and on his law he meditates day and night.`,
        },
        {
          type: PartType.text,
          content: `These special forms of blockquotes do a few things:
          
1. Verse numbers are made **superscript**
1. Indentation works well for **poetry**
1. Optional: If a passage reference is specified at the beginning, a link to the passage will come at the end of the quote`,
        },
        {
          type: PartType.heading,
          content: `As mentioned, a reference for the quote can be stated at the beginning of the quote, in parentheses. If a passage is specified, it will be stripped out of the main quotation and then inserted at the end; if the reference cited is a valid reference to Scripture, it will be inserted as a link.`,
        },
        {
          type: PartType.example,
          content: `References aren't necessary, so, for example, we could quote [|Ps 7:3-5|] without including the reference in the quote:

|> 3 O LORD my God, if I have done this,
|> |>    if there is wrong in my hands,
|> 4 if I have repaid my friend with evil
|> |>    or plundered my enemy without cause,
|> 5 let the enemy pursue my soul and overtake it,
|> |>    and let him trample my life to the ground
|> |>    and lay my glory in the dust.

Or they can be specified within the quote in parentheses on the first line:

|> (Ps 7:3-5) 3 O LORD my God, if I have done this,
|> |>    if there is wrong in my hands,
|> 4 if I have repaid my friend with evil
|> |>    or plundered my enemy without cause,
|> 5 let the enemy pursue my soul and overtake it,
|> |>    and let him trample my life to the ground
|> |>    and lay my glory in the dust.

Quotations might come from elsewhere than the Scriptures, as well, so a "reference" that's *not* a Scripture reference can also be included---it just won't be a link:

|> (Wikipedia) Two ancient Israelite and Jewish places of worship on the Temple Mount in the Old City of Jerusalem have been called the Temple in Jerusalem, or the Holy Temple (Hebrew: בֵּית־הַמִּקְדָּשׁ, Modern: Bēt HaMīqdaš, Tiberian: Bēṯ HamMīqdāš; Arabic: بيت المقدس Bait al-Maqdis).`,
        },
        {
          type: PartType.text,
          content: `Be careful using this notation with non-Biblical texts, however, because any numbers that appear in the text will be treated like verse numbers.`,
        },
        { type: PartType.heading, content: 'Formatting of Verse Numbers' },
        {
          type: PartType.text,
          content: `In order for the verse formatting to work, verse numbers have to be surrounded by whitespace (to distinguish verse numbers from any other text that has numbers in it).`,
        },
        {
          type: PartType.example,
          content: `Because of the spacing, this works:
          
|> 1 some 2 text

and this doesn't:

|> 1some 2text

and this partially does:

|> 1 some 2text`,
        },
        {
          type: PartType.text,
          content: `Standard blockquotes can always be used, allowing for more control over spacing. The \`^\` character can be used for superscript for verse numbers.`,
        },
        {
          type: PartType.example,
          content: `> ^1^In the beginning was the Word, and the Word was with God, and the Word was God. ^2^He was in the beginning with God. 3 All things were made through him, and without him was not any thing made that was made. ^4^In him was life, and the life was the light of men. ^5^The light shines in the darkness, and the darkness has not overcome it.`,
        },
        { type: PartType.heading, content: 'Poetry' },
        {
          type: PartType.text,
          content: `Where the special \`|>\` notation comes in especially handy is with **poetry** in the Scriptures, especially when it comes to **indentation**. Multiple levels of indentation can be achieved by having multiple levels of \`|>\` notation, such as:`,
        },
        {
          type: PartType.example,
          content: `We read in [|Psalm 1:1-2|]:

|> 1 Blessed is the man
|> |> who walks not in the counsel of the wicked,
|> nor stands in the way of sinners,
|> |> nor sits in the seat of scoffers;
|> 2 but his delight is in the law of the LORD,
|> |> and on his law he meditates day and night.`,
        },
        {
          type: PartType.text,
          content: `An easy way to quote large passages of Scripture is to copy and paste the verses directly, select the text, and then click the **Scripture Quotation** button in the editor's toolbar; this will automatically insert the \`|>\` notation at the beginning of each line, and, in cases where lines are indented, add *multiple* \`|> |>\` notations as necesary.`,
        },
        {
          type: PartType.text,
          content: `For example, when initially pasting in [|Ps 1:1-2|] it will look like this:

\`\`\`
1 Blessed is the man
    who walks not in the counsel of the wicked,
nor stands in the way of sinners,
    nor sits in the seat of scoffers;
2 but his delight is in the law of the LORD,
    and on his law he meditates day and night.
\`\`\`

If that block of text is selected and the **Scripture Quotation** button is clicked, it will look more like this:

\`\`\`
|> 1 Blessed is the man
|> |>    who walks not in the counsel of the wicked,
|> nor stands in the way of sinners,
|> |>    nor sits in the seat of scoffers;
|> 2 but his delight is in the law of the LORD,
|> |>    and on his law he meditates day and night.
\`\`\`

Which will render similar to:

|> 1 Blessed is the man
|> |>    who walks not in the counsel of the wicked,
|> nor stands in the way of sinners,
|> |>    nor sits in the seat of scoffers;
|> 2 but his delight is in the law of the LORD,
|> |>    and on his law he meditates day and night.`,
        },
        {
          type: PartType.heading,
          content: 'Spaces at the Beginning of Lines',
        },
        {
          type: PartType.text,
          content: `Spaces at the beginning of the line are ignored within this notation, which allows the author to clean up the way the text is typed into the markdown box (if desired), without impacting the way the formatted version is rendered. For example:`,
        },
        {
          type: PartType.example,
          content: `|>      1 Blessed is the man
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
