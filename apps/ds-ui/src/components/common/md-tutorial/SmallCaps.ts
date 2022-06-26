import { SectionDocumentation, PartType } from './TutorialTypes';

export const smallcapsSection: SectionDocumentation = {
  parts: [
    {
      type: PartType.text,
      content:
        'Text can be rendered as normal ^-^Small Caps^-^ by surrounding it with `^-^` notations, such as `^-^This Is Small Caps^-^`. This is not a common markdown notation. For example:',
    },
    {
      type: PartType.example,
      content: `This text includes an example of ^-^Small Caps^-^ in it.`,
    },
  ],
};
