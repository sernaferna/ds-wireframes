import { SectionDocumentation, PartType } from './TutorialTypes';

export const paragraphsSection: SectionDocumentation = {
  parts: [
    {
      type: PartType.text,
      content: `No special formatting is required to create paragraphs; pressing *Enter* two (or more) times at the end of a line will create paragraphs as expected. For example:`,
    },
    {
      type: PartType.example,
      content: `This is one paragraph.
  
This is another.
        
        
        
        
        
And this is a third, regardless of how many empty lines came before it!`,
    },
  ],
};
