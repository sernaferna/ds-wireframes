export interface PlanDay {
  osis: string;
}

export interface BasePlanAttributes {
  name: string;
  description: string;
  length: number;
  isAdmin: boolean;
  includesApocrypha: boolean;
  includeWeekends: boolean;
  version: string;
  osis?: string;
  days?: PlanDay[];
}

export enum PlanStatus {
  Unsaved = 'Unsaved',
  Saved = 'Saved',
  Published = 'Published',
  Deleted = 'Deleted',
}

export interface PlanAttributes extends BasePlanAttributes {
  planId: string;
  planInstanceId: string;
  status: PlanStatus;
}

export interface BaseInstantiatedPlan {
  planInstanceId: string;
  percentageComplete?: number;
}

export interface InstantiatedPlan extends BaseInstantiatedPlan {
  id: string;
  days?: {
    completed: boolean;
  }[];
}
