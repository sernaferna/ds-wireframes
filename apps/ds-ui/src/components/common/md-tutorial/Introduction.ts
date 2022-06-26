import { SectionDocumentation, PartType } from './TutorialTypes';

export const introductionSection: SectionDocumentation = {
  parts: [
    {
      type: PartType.text,
      content: `This text box accepts a notation called **markdown**, which is a simplified way of adding formatting to text. With markdown you can use formatting like **bold**, *italics* and even ==highlighting==, not to mention specialised formatting of use to the Christian (such as being able to use the name ^^^LORD^^^).
  
You might be wondering, "Do I really need to learn this 'markdown' notation?" And the answer is no, you don't! Markdown is designed such that you only need to use the parts you want; if all you want to do is write some text with no formatting, you can! But if you ever decide to use italics, you can; if you want to create a link to a particular Bible verse, you can; if you want to highlight something, to come back to later, you can. You can learn just the parts of markdown you need, as you need them, without burdoning yourself with a huge learning endeavour.
        
**Note**: When the full-screen version of the text editor is used there is a toolbar with buttons for many of these formatting options and other markdown features.`,
    },
  ],
};
