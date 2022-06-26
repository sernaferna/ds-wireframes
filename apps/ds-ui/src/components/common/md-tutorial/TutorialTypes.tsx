export enum PartType {
  text = 'text',
  example = 'example',
}
interface SectionPart {
  type: PartType;
  content: string;
}
export interface SectionDocumentation {
  parts: SectionPart[];
}
