import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';

export interface IUISlice {
  settingsShowing: boolean;
  dateShowingInActions?: string;
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
  },
});

export const { showSettingsPanel, updateDateShowingInActions } = uiSlice.actions;
export default uiSlice.reducer;

export const selectShowSettings = (state: RootState) => state.ui.settingsShowing;
export const getDateForActions = (state: RootState) => {
  return state.ui.dateShowingInActions ? state.ui.dateShowingInActions : new Date().toISOString().split('T')[0];
};
