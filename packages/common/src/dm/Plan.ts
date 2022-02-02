export interface PlanAttributes {
  name: string;
  description: string;
  length: number;
  admin: boolean;
  percentageComplete?: number;
  includesApocrypha: boolean;
  version: string;
}
