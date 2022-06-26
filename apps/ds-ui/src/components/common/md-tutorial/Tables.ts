import { SectionDocumentation, PartType } from './TutorialTypes';

export const tableSection: SectionDocumentation = {
  parts: [
    {
      type: PartType.text,
      content: `A table can be created with careful use of the \`|\` (pipe) character. Consider the following example, in which a header is created for the table followed by two "normal" rows:`,
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
};
