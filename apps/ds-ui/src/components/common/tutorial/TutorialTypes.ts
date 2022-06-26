export enum PartType {
  text = 'text',
  example = 'example',
}

export interface SectionPart {
  type: PartType;
  content: string;
}

export interface Section {
  title: string;
  parts: SectionPart[];
}

export interface SectionDocumentation {
  mainSection: Section;
  subSections: Section[];
}
