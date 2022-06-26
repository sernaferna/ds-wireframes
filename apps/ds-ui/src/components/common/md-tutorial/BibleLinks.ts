import { SectionDocumentation, PartType } from './TutorialTypes';

export const bibleLinkSection: SectionDocumentation = {
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
      content: `It says in [[Rom 1:1]NIV] that Paul is an Apostle, even though he wasn't one of the *original* Apostles (as called out in [[Matt 10:5-15]ESV] or [[Mark 3:13-21]] or ==other examples==.)
  
If you're interested, the **Apostles' Creed** can be found at the [Christian Reformed Church website](https://www.crcna.org/welcome/beliefs/creeds/apostles-creed)`,
    },
    {
      type: PartType.text,
      content: `Notice that the rendered version of the link has some formatting applied to it:
  
* Even if an abbreviation is used for the reference, a more complete, formatted version is used
* The version is shown in parantheses after the passage
* A small cross icon is also appended, to differentiate these specific Bible Gateway links from other, regular links (as opposed to the other link included in this example, that doesn't have that icon).`,
    },
  ],
};
