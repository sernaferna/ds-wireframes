import { Verse } from './Verse';

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
  planId: string;
  planInstanceId: string;
}

export interface PlanWeek {
  days: PlanDay[];
}

export interface PlanDay {
  verses: Verse[];
}

export interface BaseInstantiatedPlan {
  planInstanceId: string;
  percentageComplete?: number;
}

export interface InstantiatedPlan extends BaseInstantiatedPlan {
  id: string;
}
