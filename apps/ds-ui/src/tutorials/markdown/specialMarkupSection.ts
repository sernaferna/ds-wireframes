import { SectionDocumentation, PartType } from '../../dm/tutorials/TutorialTypes';

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
      title: 'Links to the Bible Gateway',
      parts: [
        {
          type: PartType.text,
          content: `As mentioned above, **hyperlinks** can be created the standard \`[Hyperlink text](hyperlinkUrl)\` markdown notation, but **Devouring Scripture** also introduces a notation specifically for the creation of links to passages of Scripture (using the **Bible Gateway** website), in the format \`[|Reference|]\`.`,
        },
        {
          type: PartType.example,
          content: 'A link to [|Rom 1:32-2:4|]',
        },
        {
          type: PartType.text,
          content: `This is a nice, compact notation in markdown, but, as shown, a number of enhancements are made when the link is rendered into the formatted version:
* A small cross icon is appended to highlight that this link goes specifically to the **Bible Gateway** for a passage of scripture, as opposed to a "normal" link
* The reference is expanded to a longform notation (i.e. \`Rom 1:32-2:4\` becomes \`Romans 1:32—2:4\`)
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
          content: `Any version supported by Bible Gateway can be used but keep in mind that **Devouring Scripture** won't *validate* it, the specified version will be passed to **Bible Gateway** as-is. So something like \`[|Rom 1|ABC]\` would create the link as normal, using the version \`ABC\`, but clicking the link would prompt an error from **Bible Gateway** because it doesn't recognize a version of the Bible named \`ABC\`.`,
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
            
The only option currently available is \`s\` (for "short"), which specifies that the reference should not be expanded into a more readable form; as long as it's valid, it will be rendered as-is.`,
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
          content: `Although **Devouring Scripture** doesn't validate Bible versions it *does* validate the **reference** given. If the reference isn't valid the link won't be created, the the text will just be left alone.`,
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
          content: `Standard markdown blockquotes (discussed above) can, of course, be used for quoting passages of Scripture, but a special notation using \`|>\` instead of \`>\` can be used instead, which works the same as regular blockquotes but with some important additions specific to quoting Scripture.
          
The notation is useful on its own, but using the **Scripture Quotation** button to generate this markup is even more helpful, as discussed below.

For example:`,
        },
        {
          type: PartType.example,
          content: `To quote King David:
          
|> (Ps 1:1-2) ^1^ Blessed is the man
|> |>  who walks not in the counsel of the wicked,
|> nor stands in the way of sinners,
|> |>  nor sits in the seat of scoffers;
|> ^2^ but his delight is in the law of the ^^^LORD^^^,
|> |>  and on his law he meditates day and night.`,
        },
        {
          type: PartType.text,
          content: `These special forms of blockquotes do a couple of things:
          
* Indentation works well for **poetry** when \`|> |>\` notations are nested
* Optional: If a citation is specified at the beginning it will be appended to the end of the quote, aligned on the right; if Devouring Scripture recognizes it as a Bible reference a link will automatically be created
  * If a version other than the default version is to be used, a link should be created manually using the \`[|REF|VER]\` notation discussed above. Some examples below will demonstrate this.

Both of these will be discussed in more detail below.`,
        },
        {
          type: PartType.heading,
          content: 'Reference Citations',
        },
        {
          type: PartType.text,
          content: `As mentioned, a citation for the quote can be included at the beginning, in parentheses. It will be stripped out of the main quotation and re-appended at the end, aligned to the right and in italics.
          
Some formatting can be included, though formatting *can* confuse the rendering engine so use at your own risk. 

A reference to Scripture can be included using the \`[|Ref|}\` notation, or, if the citation is a valid reference to Scripture, Devouring Scripture can create the link automatically.`,
        },
        {
          type: PartType.example,
          content: `Citations aren't necessary, so, for example, we could quote [|Ps 7:3-5|] without including the reference in the quote:

|> ^3^ O ^^^LORD^^^ my God, if I have done this,
|> |>    if there is wrong in my hands,
|> ^4^ if I have repaid my friend with evil
|> |>    or plundered my enemy without cause,
|> ^5^ let the enemy pursue my soul and overtake it,
|> |>    and let him trample my life to the ground
|> |>    and lay my glory in the dust.

Or they can be specified within the quote in parentheses on the first line:

|> (Ps 7:3-5) ^3^ O ^^^LORD^^^ my God, if I have done this,
|> |>    if there is wrong in my hands,
|> ^4^ if I have repaid my friend with evil
|> |>    or plundered my enemy without cause,
|> ^5^ let the enemy pursue my soul and overtake it,
|> |>    and let him trample my life to the ground
|> |>    and lay my glory in the dust.

Devouring Scripture will reconize the reference and create the link automatically.

If a specific version is desired (other than the default), the \`[|REF|VER]\` syntax can be used:

|> ([|Ps 7:3-5|ESV]) ^3^ O ^^^LORD^^^ my God, if I have done this,
|> |>    if there is wrong in my hands,
|> ^4^ if I have repaid my friend with evil
|> |>    or plundered my enemy without cause,
|> ^5^ let the enemy pursue my soul and overtake it,
|> |>    and let him trample my life to the ground
|> |>    and lay my glory in the dust.


More complex content can be included, such as:

|> ([|Ps 7:3-5|ESV], emphasis added) ^3^ O ^^^LORD^^^ my God, if I have done this,
|> |>    if there is wrong in my hands,
|> ^4^ if I have **repaid my friend with evil**
|> |>    or plundered my enemy without cause,
|> ^5^ let the enemy pursue my soul and overtake it,
|> |>    and let him trample my life to the ground
|> |>    and lay my glory in the dust.

Quotations might come from elsewhere than the Scriptures, as well, so a "reference" that's *not* a Scripture reference can also be included---it just won't be a link:

|> (Wikipedia) Two ancient Israelite and Jewish places of worship on the Temple Mount in the Old City of Jerusalem have been called the Temple in Jerusalem, or the Holy Temple (Hebrew: בֵּית־הַמִּקְדָּשׁ, Modern: Bēt HaMīqdaš, Tiberian: Bēṯ HamMīqdāš; Arabic: بيت المقدس Bait al-Maqdis). The First Temple or Solomon's Temple was built in 957 B.C.E. and destroyed by the Babylonians in 587 or 586 B.C.E.. The Second Temple was completed in 515 B.C.E., and was destroyed by the Romans during the Siege of Jerusalem in 70 C.E.`,
        },
        { type: PartType.heading, content: 'Indentation for Poetry' },
        {
          type: PartType.text,
          content: `Where the special \`|>\` notation comes in especially handy is with **poetry**, especially when it comes to **indentation**. Multiple levels of indentation can be achieved by having multiple levels of \`|>\` notation, such as:`,
        },
        {
          type: PartType.example,
          content: `We read in the Psalms:

|> (Ps 1:1-2) ^1^ Blessed is the man
|> |> who walks not in the counsel of the wicked,
|> nor stands in the way of sinners,
|> |> nor sits in the seat of scoffers;
|> ^2^ but his delight is in the law of the ^^^LORD^^^,
|> |> and on his law he meditates day and night.`,
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
          content: `|>      ^1^ Blessed is the man
|> |>      who walks not in the counsel of the wicked,
|>      nor stands in the way of sinners,
|> |>   nor sits in the seat of scoffers;
|>      ^2^ but his delight is in the law of the ^^^LORD^^^,
|> |>      and on his law he meditates day and night.`,
        },
        {
          type: PartType.text,
          content: `As illustrated, the extra spaces before each line don't impact the way the text is finally rendered, as long as the proper number of \`|>\` headings come at the beginning of each line. In the example above, the author forgot to put extra spaces at the beginning of the 4^th^ line, but because the right number of \`|> |>\` entries were included it still renders correctly in the formatted version.`,
        },
        {
          type: PartType.heading,
          content: 'Using the "Scripture Quotation" Button',
        },
        {
          type: PartType.text,
          content: `An easy way to quote large passages of Scripture is to copy and paste the verses directly, select the text, and then click the **Scripture Quotation** button in the editor's toolbar to apply the formatting necessary for quoting Scripture. The app will automatically insert the \`|>\` notation at the beginning of each line, and, in cases where lines are indented (via sets of 2 spaces at the beginning of the line), add *multiple* \`|> |>\` notations as necesary.
          
It will also look for numbers in the text and superscript them, under the assumption that they're verse numbers, attempt to replace any eras showing up in the text (e.g. \`B.C.\` or \`B.C.E.\`), and apply the \`^^^\` notation to any words appearing all in uppercase.`,
        },
        {
          type: PartType.text,
          content: `For example, when initially pasting in Psalm 1:1--2 it will look like this:


\`\`\`
1 Blessed is the man[a]
    who walks not in the counsel of the wicked,
nor stands in the way of sinners,
    nor sits in the seat of scoffers;
2 but his delight is in the law[b] of the Lord,
    and on his law he meditates day and night.
\`\`\`

The text may include footnote references (such as the \`[a]\` and \`[b]\` above), so these should be removed. Additionally, some words that appear all in uppercase on the screen, such as the word ^^^LORD^^^ in verse 2, might *not* be all uppercase when copied and pasted, as illustrated above. (This is due to the way some websites display text using \`HTML\` and \`CSS\`, which isn't worth going into in this tutorial.)

Once the text is cleaned up by removing those footnotes and making text uppercase again, it might look more like this:

\`\`\`
1 Blessed is the man
    who walks not in the counsel of the wicked,
nor stands in the way of sinners,
    nor sits in the seat of scoffers;
2 but his delight is in the law of the LORD,
    and on his law he meditates day and night.
\`\`\`

If that block of text is selected and the **Scripture Quotation** button is clicked, it will be formatted like this:

\`\`\`
|> ^1^ Blessed is the man
|> |>    who walks not in the counsel of the wicked,
|> nor stands in the way of sinners,
|> |>    nor sits in the seat of scoffers;
|> ^2^ but his delight is in the law of the ^^^LORD^^^,
|> |>    and on his law he meditates day and night.
\`\`\`

Which will render similar to:

|> ^1^ Blessed is the man
|> |>    who walks not in the counsel of the wicked,
|> nor stands in the way of sinners,
|> |>    nor sits in the seat of scoffers;
|> ^2^ but his delight is in the law of the ^^^LORD^^^,
|> |>    and on his law he meditates day and night.`,
        },
        {
          type: PartType.text,
          content:
            'Citations/references are not automatically added, so these would need to be added manually to the beginning of the text if desired.',
        },
        {
          type: PartType.text,
          content:
            'Be careful with passages that include numbers other than verse numbers, because the **Scripture Quotation** button will make the numbers superscript.',
        },
        {
          type: PartType.text,
          content: `Pasting Acts 13:20--21 would yield the following:

\`\`\`
20 All this took about 450 years. And after that he gave them judges until Samuel the prophet. 21 Then they asked for a king, and God gave them Saul the son of Kish, a man of the tribe of Benjamin, for forty years.
\`\`\`

Selecting that text and clicking the **Scripture Quotation** button would yield this:

\`\`\`
|> ^20^ All this took about ^450^ years. And after that he gave them judges until Samuel the prophet. ^21^ Then they asked for a king, and God gave them Saul the son of Kish, a man of the tribe of Benjamin, for forty years.
\`\`\``,
        },
        {
          type: PartType.text,
          content: `It would be necessary to remove the \`^\` characters from around the number **450** since, in this case, that's a number that shows in the text, as opposed to a verse number.`,
        },
      ],
    },
    {
      title: 'Special Formatting for Christian Use: Words in UPPERCASE',
      parts: [
        {
          type: PartType.text,
          content: `This was mentioned in the cheat sheet, but it's worth revisiting here.
          
Scripture sometimes contains words that appear \`IN ALL CAPITAL LETTERS\` (often, but not always, proper names, such as the name of the ^^^LORD^^^). In printed Bibles, and on some websites, such text is often formatted as ^^^SMALL CAPS^^^ for readability. For the Christian, these words should always be in all uppercase, even if they're formatted differently on the screen/page.

Devouring Scripture uses the \`^^^WORD^^^\` notation; words surrounded with sets of three caret characters like that will appear in all uppercase, in Small Caps, on devices that support this formatting. On devices that don't support the capability, they'll simply show as all uppercase.`,
        },
        {
          type: PartType.example,
          content: `Revelation says:
          
|> ([|Rev 11:17|KJV]) Saying, We give thee thanks, O ^^^LORD^^^ God Almighty, which art, and wast, and art to come; because thou hast taken to thee thy great power, and hast reigned.

which relates back to the Psalms, which say:

|> (Ps 2:2) The kings of the earth set themselves,
|> |> and the rulers take counsel together,
|> |> against the ^^^LORD^^^ and against his Anointed, saying,`,
        },
        {
          type: PartType.heading,
          content: 'Automatic Handling',
        },
        {
          type: PartType.text,
          content: `When using the **Scripture Quotation** button in the toolbar, this formatting will be applied on your behalf. 
          
For example, suppose the following text is pasted into the editor:
          
\`\`\`
The kings of the earth set themselves,
  and the rulers take counsel together,
  against the LORD and against his Anointed, saying,
\`\`\`

If it is selected, and the **Scripture Quotation** tool is clicked in the toolbar, the text will be formatted as follows:

\`\`\`
|> The kings of the earth set themselves,
|> |> and the rulers take counsel together,
|> |> against the ^^^LORD^^^ and against his Anointed, saying,
\`\`\`

There may be cases where this is not the desired behaviour; for example, consider the following:

\`\`\`
(some website) The ESV and the NIV translate this passage differently, so the ESV has been chosen in this case.
\`\`\`

In this case, if that text is selected and the **Scripture Quotation** button is clicked, it will be converted to:

\`\`\`
|> (some website) The ^^^ESV^^^ and the ^^^NIV^^^ translate this passage differently, so the ^^^ESV^^^ has been chosen in this case.
\`\`\`

This is probably not what the original author wanted, so the \`^^^\` notations should be removed so that it reads NIV instead of ^^^NIV^^^ in the rendered output.

Similarly---though this is a matter of preference---if the following text is entered:

\`\`\`
Thus saith the LORD GOD ALMIGHTY
\`\`\`

The **Scripture Quotation** tool will produce the following:

\`\`\`
|> Thus saith the ^^^LORD^^^ ^^^GOD^^^ ^^^ALMIGHTY^^^
\`\`\`

This is perfectly valid, and will render correctly, but some might prefer to edit the text to turn \`^^^LORD^^^ ^^^GOD^^^ ^^^ALMIGHTY^^^\` into \`^^^LORD GOD ALMIGHTY^^^\``,
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
          content: `Another example of this type of formatting is for cases where the **era** is being specified for a date; for example, the year 100^^B.C.^^. The **era** is often written in small capitals. (That is, ^^SMALL CAPS^^, where all of the letters are the small version of ^^^SMALL CAPS^^^.) A similar notation can be used as is the case for all capitalized words, using \`^^\` instead of \`^^^\`:`,
        },
        {
          type: PartType.example,
          content: `The year ^^A.D.^^2020 was a rough one around the world because of the pandemic, but there was an even worse pandemic around 3000^^B.C.^^ in China.`,
        },
        {
          type: PartType.text,
          content: `Similar to the \`^^^\` notation, the \`^^\` notation doesn't require text in markdown to be all uppercase, so \`^^a.d.^^\` will still be shown as ^^A.D.^^, but the notation is *usually* used for text that is all uppercase.`,
        },
        {
          type: PartType.text,
          content: `Just like with the \`^^^\` notation, the **Scripture Quotation** button will attempt to automatically apply \`^^\` formatting to anyhting that looks like an **era**, but the result may need to be edited.`,
        },
      ],
    },
  ],
};
