import { ActionsForDay, ActionEntry, ActionType } from '@devouringscripture/common';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

/**
 * Helper function to return all of the necessary data for an
 * `ActionsForDay` object for a given day.
 *
 * @param date ISO date for which actions should be generated
 * @param id ID for the day, if it's already been set
 * @returns Populated `ActionsForDay` structure, with no completions
 */
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

/**
 * Helper function to go back over the previous 30 days and generate
 * test data. For each item in each day it randomly decides whether to
 * generate the item, and then randomly decides whether to indicate
 * it's completed.
 *
 * @returns Array of randomly populated `ActionsForDay` objects
 */
export const generateActionBacklog = (): ActionsForDay[] => {
  const actions: ActionsForDay[] = [];

  for (let i = 30; i > 0; i--) {
    if (Math.random() < 0.5) {
      // create `DateTime` `i` days in the past and convert back to ISO string
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
