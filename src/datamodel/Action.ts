export interface BaseActionType {
  displayName: string;
}

export interface ActionType extends BaseActionType {
  id: string;
}

export interface ActionEntry extends ActionType {
  completed: boolean;
}

export interface ActionsForDay {
  date: string;
  id: string;
  defaultActions: ActionEntry[];
  customActions: ActionEntry[];
}
