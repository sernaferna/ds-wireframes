export interface BaseNote {
  passageStart: number;
  passageEnd: number;
  text: string;
}

export interface Note extends BaseNote {
  id: string;
  lastUpdateDate: string;
}
