import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';

export interface IUISlice {
  settingsShowing: boolean;
}

const initialState: IUISlice = { settingsShowing: false };

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    showSettingsPanel: (state: IUISlice, action: PayloadAction<boolean>) => {
      state.settingsShowing = action.payload;
    },
  },
});

export const { showSettingsPanel } = uiSlice.actions;
export default uiSlice.reducer;

export const selectShowSettings = (state: RootState) => state.ui.settingsShowing;
