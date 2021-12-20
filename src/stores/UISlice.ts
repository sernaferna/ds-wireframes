import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';
import { DateTime } from 'luxon';

export interface IUISlice {
  settingsShowing: boolean;
  dateShowingInActions?: string;
  selectedReadingItem?: string;
}

const initialState: IUISlice = { settingsShowing: false };

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    showSettingsPanel: (state: IUISlice, action: PayloadAction<boolean>) => {
      state.settingsShowing = action.payload;
    },
    updateDateShowingInActions: (state: IUISlice, action: PayloadAction<string>) => {
      state.dateShowingInActions = action.payload;
    },
    updateSelectedReadingItem: (state: IUISlice, action: PayloadAction<string>) => {
      state.selectedReadingItem = action.payload;
    },
  },
});

export const { showSettingsPanel, updateDateShowingInActions, updateSelectedReadingItem } = uiSlice.actions;
export default uiSlice.reducer;

export const selectShowSettings = (state: RootState) => state.ui.settingsShowing;
export const getDateForActions = (state: RootState) => {
  return state.ui.dateShowingInActions ? state.ui.dateShowingInActions : DateTime.now().toISODate();
};
export const getSelectedReadingItem = (state: RootState) => {
  return state.ui.selectedReadingItem || '';
};
