export interface BasePassage {
  reference: string;
  version: string;
}

export interface Passage extends BasePassage {
  id: string;
  date: string;
}

export interface PassageItems {
  [key: number]: Passage;
}
