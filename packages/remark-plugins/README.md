# Remark Plugins (@devouringscripture/remark-plugins)

For inputs that accept **markdown** (e.g. prayer items, notes), the application leverages the [**react-md-editor**](https://github.com/uiwjs/react-md-editor) component, which supports most common markdown conventions (e.g. bold and italics, headings, inline code and codeblocks, blockquotes, links, and even footnotes). It also supports **Remark plugins** that can further enhance the way MD is converted to HTML.

This library provides a set of such plugins, some of which are particularly of use to Christians and others that are "generic" markdown functionality that wasn't bundled with react-md-editor out of the box. These plugins make it easier to use common notations with nicely rendered outputs.

For a description of what each plugin can do see the Markdown Tutorial included in **ds-ui**, but in short the following plugins are provided:

- Title All Caps (`tac`): Handles a special case that comes up often in Christian writing where a word should be written in all capital letters but can be rendered in Small Caps (where the device supports it). A common example is the way the word "LORD" is often rendered in Old Testament Scriptures.
- Lower Caps (`lowerCaps`): Similar to Title All Caps in that the text is rendered as Small Caps except that all of the letters are in small letters. Useful for writing things like `2022A.D.` where the "A.D." should be rendered smaller for readability.
- Small Caps (`smallCaps`): Renders text as regular Small Caps.
- Highlight (`highlight`): Highlights text surrounded by `==` (using the HTML `<mark>` tag). Other markdown editors also use this convention.
- Bible Links (`bibleLinks`): Special case for rendering a link to a Bible passage on the **Bible Gateway** website, The link will also be decorated with the version in parentheses as well as a cross icon to visually distinguish these links from other links.
- Smartquotes (`smartquotes`): Simply renders quotation marks as "smart" quotes; no special markup required by the markdown author
- Bible Poetry (`poetryBlocks`): Renders larger Bible quotations in a slightly smarter way; essentially a `blockquote` with the following additions:
  - Verse numbers are superscripted, and
  - Nesting works well for including Biblical poetry (with the indentation required)
