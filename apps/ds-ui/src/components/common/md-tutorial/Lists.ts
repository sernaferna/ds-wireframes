import { SectionDocumentation, PartType } from './TutorialTypes';

export const listsSection: SectionDocumentation = {
  parts: [
    {
      type: PartType.text,
      content:
        'Numbered and bulleted lists can be created by putting an asterisk or number at the beginning of each item in the list. Asterisks will create bullets, and numbers will create a numbered list.',
    },
    {
      type: PartType.example,
      content: `Asterisks can be used to create bulleted lists:
  
* This is the first item in a bulleted list.
* This is the second
    * This is a sub-bullet
* This is a final bullet in the list
        
Numbers (with periods) can be used to create numbered lists:
        
1. This is the first item in a numbered list
2. This is the second
    1. This is a sub-item
3. This is the final bullet in the list
        
The numbers in a numbered list don't need to be properly in order:
        
1. This is the first item in a numbered list
1. This is the second, regardless of the number used in markdown`,
    },
  ],
};
