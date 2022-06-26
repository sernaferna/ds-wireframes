import { SectionDocumentation, PartType } from './TutorialTypes';

export const headingsSection: SectionDocumentation = {
  parts: [
    {
      type: PartType.text,
      content: `Headers can also be created by using \`#\` characters at the beginning of the heading; one \`#\` for the largest heading, two for a smaller one, and three for a smaller one still:`,
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
};
