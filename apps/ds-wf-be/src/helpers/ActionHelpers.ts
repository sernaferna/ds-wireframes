import { ActionsForDay, ActionEntry, defaultActionTypes, defaultCustomActions } from '../dm/Action';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

export const populateActionsForDay = (date: string, id?: string): ActionsForDay => {
  const defaultActions: ActionEntry[] = defaultActionTypes.map((item) => ({
    id: item.id,
    displayName: item.displayName,
    completed: false,
  }));
  const customActions: ActionEntry[] = defaultCustomActions.map((item) => ({
    id: item.id,
    displayName: item.displayName,
    completed: false,
  }));

  const newId = id ? id : uuidv4();
  const entry: ActionsForDay = { defaultActions, customActions, date, id: newId };

  return entry;
};

/*
Goes back over the last 30 days. For each day: randomly decides whether not to generate an item, and then for each action randomly decides whether to indicate it's completed.
*/
export const generateActionBacklog = (): ActionsForDay[] => {
  const actions: ActionsForDay[] = [];

  for (let i = 30; i > 0; i--) {
    if (Math.random() < 0.5) {
      //const dateToUse = new Date(new Date().setDate(new Date().getDate() - i)).toISOString().split('T')[0];
      // create a Luxon `DateTime` which is `i` days in the past, and convert it back to an ISO date string
      const dateToUse = DateTime.now().minus({ days: i }).toISODate();
      const action = populateActionsForDay(dateToUse);
      for (let j = 0; j < action.customActions.length; j++) {
        if (Math.random() < 0.5) {
          action.customActions[j].completed = true;
        }
      }
      for (let j = 0; j < action.defaultActions.length; j++) {
        if (Math.random() < 0.5) {
          action.defaultActions[j].completed = true;
        }
      }

      actions.push(action);
    }
  }

  return actions;
};
