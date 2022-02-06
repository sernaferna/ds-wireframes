import { Verse } from '..';

export interface BasePlanAttributes {
  name: string;
  description: string;
  length: number;
  isAdmin: boolean;
  includesApocrypha: boolean;
  includeWeekends: boolean;
  version: string;
  osis: string;
  weeks: PlanWeek[];
}

export interface PlanAttributes extends BasePlanAttributes {
  id: string;
}

export interface PlanWeek {
  days: Verse[];
}
