import { Reducer } from 'react';

interface InternalState {
  value: string;
  startReference: string;
  endReference: string;
  localSelectedReadingItem: string;
  localNoteId: string;
}

export const initialInternalState: InternalState = {
  value: '',
  startReference: '',
  endReference: '',
  localSelectedReadingItem: '',
  localNoteId: '',
};

export enum ReducerActionType {
  SET_VALUE,
  SET_START_REF,
  SET_END_REF,
  SET_LOCAL_SELECTED_READING_ITEM,
  RESET_FOR_SELECTED_NOTE,
  RESET_FOR_NOTE_RETRIEVED,
  RESET_FOR_PASSAGE_NO_NOTE,
}

type SetValueAction = {
  type: ReducerActionType.SET_VALUE;
  payload: string;
};

type SetStartRefAction = {
  type: ReducerActionType.SET_START_REF;
  payload: string;
};

type SetEndRefAction = {
  type: ReducerActionType.SET_END_REF;
  payload: string;
};

type SetLocalSelectedReadingItemAction = {
  type: ReducerActionType.SET_LOCAL_SELECTED_READING_ITEM;
  payload: string;
};

type ResetForSelectedNoteAction = {
  type: ReducerActionType.RESET_FOR_SELECTED_NOTE;
  payload: string;
};

type ResetForNoteRetrievedAction = {
  type: ReducerActionType.RESET_FOR_NOTE_RETRIEVED;
  payload: {
    startReference: string;
    endReference: string;
    value: string;
  };
};

type ResetForPassageNoNoteAction = {
  type: ReducerActionType.RESET_FOR_PASSAGE_NO_NOTE;
  payload: {
    startReference: string;
    endReference: string;
  };
};

type ReducerAction =
  | SetValueAction
  | SetStartRefAction
  | SetEndRefAction
  | SetLocalSelectedReadingItemAction
  | ResetForSelectedNoteAction
  | ResetForNoteRetrievedAction
  | ResetForPassageNoNoteAction;

export const useNoteReducer: Reducer<InternalState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case ReducerActionType.SET_VALUE:
      return { ...state, value: action.payload };
    case ReducerActionType.SET_START_REF:
      return { ...state, startReference: action.payload };
    case ReducerActionType.SET_END_REF:
      return { ...state, endReference: action.payload };
    case ReducerActionType.SET_LOCAL_SELECTED_READING_ITEM:
      return { ...state, localSelectedReadingItem: action.payload };
    case ReducerActionType.RESET_FOR_SELECTED_NOTE:
      return { ...state, localNoteId: action.payload, localSelectedReadingItem: '' };
    case ReducerActionType.RESET_FOR_NOTE_RETRIEVED:
      return {
        ...state,
        startReference: action.payload.startReference,
        endReference: action.payload.endReference,
        value: action.payload.value,
      };
    case ReducerActionType.RESET_FOR_PASSAGE_NO_NOTE:
      return {
        ...state,
        startReference: action.payload.startReference,
        endReference: action.payload.endReference,
        payload: '',
      };
  }
};
