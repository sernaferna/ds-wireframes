import { ActionsForDay, ActionEntry, ActionType } from '@devouringscripture/common/src/dm/Action';
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

export const defaultActionTypes: ActionType[] = [
  {
    id: 'actions|default|shortotpass',
    displayName: 'Read Short OT Passage',
  },
  {
    id: 'actions|default|rsntpass',
    displayName: 'Read Short NT Passage',
  },
  {
    id: 'actions|default|rlotpass',
    displayName: 'Read Long OT Passage',
  },
  {
    id: 'actions|default|rlntpass',
    displayName: 'Read Long NT Passage',
  },
  {
    id: 'actions|default|journ',
    displayName: 'Journalled',
  },
  {
    id: 'actions|default|pray',
    displayName: 'Prayed',
  },
  {
    id: 'actions|default|create',
    displayName: 'Did Something Creative for God',
  },
  {
    id: 'actions|default|converse',
    displayName: 'Had a Spiritual Conversation',
  },
];

export const defaultCustomActions: ActionType[] = [
  {
    id: '186012ac-1978-442c-8c93-78b1f4c3e47b',
    displayName: 'Discipled my kids',
  },
  {
    id: 'dfd2065a-7e64-4c4c-8b23-55b98dafed9f',
    displayName: 'Prepared music for the service',
  },
  {
    id: '4f995e2e-b6a8-49a2-8835-f3177509cc08',
    displayName: 'Led a bible study',
  },
];
