import { SectionDocumentation, PartType } from './TutorialTypes';

export const adbcSection: SectionDocumentation = {
  parts: [
    {
      type: PartType.text,
      content: `This is similar to the case of all capitalized words, except that all of the letters are rendered in the smaller capitalized versions. For this notation two carets are used instead of three (e.g. \`^^A.D.^^\`) The best examples are the terms ^^A.D.^^ and ^^B.C.^^. For example:`,
    },
    {
      type: PartType.example,
      content: `From 1500^^B.C.^^ through to 2022^^A.D.^^ is a long time.`,
    },
  ],
};
