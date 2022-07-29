export enum PartType {
  text = 'text',
  example = 'example',
  heading = 'heading',
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
