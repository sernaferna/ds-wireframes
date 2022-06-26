import { SectionDocumentation, PartType } from './TutorialTypes';

export const lordSection: SectionDocumentation = {
  parts: [
    {
      type: PartType.text,
      content: `Some words---especially proper names---appear in all capital letters in the Scriptures; the most common example is the name of the ^^^LORD^^^ in Old Testament Scriptures. For readability, these words are often written in **Small Caps**, as was used here, where the first letter is larger than the other letters, even though they're all capitalized. For the Christian, these words should always be in all uppercase, even if they're formatted differently. Surrounding text with three carets (such as \`^^^LORD^^^\`) will cause it to be rendered similar to ^^^LORD^^^; in the markdown the letters will be all uppercase, on devices that don't support advanced formatting it will also be all uppercase, and on devices that support more advanced formatting it will be rendered in all uppercase in Small Caps format.
  
For example:`,
    },
    {
      type: PartType.example,
      content: `The ^^^LORD GOD^^^ is good.`,
    },
  ],
};
