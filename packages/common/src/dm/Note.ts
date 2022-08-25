export interface BaseNote {
  text: string;
  osis: string;
  version?: string;
}

export interface Note extends BaseNote {
  id: string;
  lastUpdateDate: string;
  passageStart: number;
  passageEnd: number;
}
