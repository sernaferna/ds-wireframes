import { SectionDocumentation, PartType } from '../tutorial/TutorialTypes';

export const mdIntroSection: SectionDocumentation = {
  mainSection: {
    title: 'Formatted Text',
    parts: [
      {
        type: PartType.text,
        content: `**Devouring Scripture** supports a notation called **markdown** to allow the user to add **formatting** to text such as prayer requests and notes. The text can be "rendered" into a more visual form or viewed with the simple, text-based formatting in place. (For example, seeing text rendered in *italics* is helpful, but seeing text \`*emphasized* with *asterisks*\` is still intuitive.)`,
      },
      {
        type: PartType.text,
        content: `This tutorial will introduce the different markdown notations supported by the app, first as a "cheat sheet" giving an at-a-glance view of the notations, and then more detailed tutorials for those who *really* want to get into markdown.`,
      },
    ],
  },
  subSections: [
    {
      title: 'Is this needed?',
      parts: [
        {
          type: PartType.text,
          content: `You might be wondering, "Do I really *need* to learn this 'markdown' notation? All I want to do is capture a few notes on some Bible passages and remember my prayer items!" And the answer is no, you don't! 😀
          
Markdown is designed such that you only need to use the parts you want, and ignore the rest.

* If all you want to do is write some text with no formatting, you can do so. No learning required!
* When you want to include multiple paragraphs you can, without having to remember any special notation. Just press *Enter* and keep going!
* If you ever want to use *italics,* it's intuitive to just surround the text with asterisks, like \`*this*\` -- and then add **bold** like \`**this**\`
* If you want to highlight something you can use a similar notation \`==like this==\`. 
* If you want to create a link to a particular Bible verse, you can learn a simple notation for that (such as \`[|Mark 1|]\`), whereby Devouring Scripture will create a link to **Bible Gateway** for you

All of this is mix-and match; you can learn as much or little of markdown as you need without burdoning yourself with a huge learning endeavour.

Best of all, many of these notations are available right from the toolbar; if you ever forget the notation for making text bold, just select the text and click the **B** button, and **Devouring Scripture** will add the notation for you.`,
        },
      ],
    },
  ],
};
