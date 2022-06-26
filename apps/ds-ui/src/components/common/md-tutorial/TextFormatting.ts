import { SectionDocumentation, PartType } from './TutorialTypes';

export const textFormattingSection: SectionDocumentation = {
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
        
A hyperlink to another website can be created with square and round brackets; for example, a link to [Google](https://www.google.ca), where the square brackets are the text that will be displayed and the round brackets contain the URL for the link. A URL can also simply be included on its own, and a link will be rendered; e.g. https://www.google.ca will be a link that can be clicked in the formatted output.`,
    },
  ],
};
