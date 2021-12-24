import { ActionType } from '@devouringscripture/common/dm/Action';

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
