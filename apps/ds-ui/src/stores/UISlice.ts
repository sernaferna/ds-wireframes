import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';
import { DateTime } from 'luxon';

export interface IUISlice {
  settingsShowing: boolean;
  dateShowingInActions?: string;
  dateShowingInReadingPlan?: string;
  selectedReadingItem?: string;
  selectedNote?: string;
  selectedPlan?: string;
  prayerViewFilter?: string;
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
    updateDateShowingInReadingPlan: (state: IUISlice, action: PayloadAction<string>) => {
      state.dateShowingInReadingPlan = action.payload;
    },
    updateSelectedReadingItem: (state: IUISlice, action: PayloadAction<string>) => {
      state.selectedReadingItem = action.payload;
    },
    updateSelectedNote: (state: IUISlice, action: PayloadAction<string>) => {
      state.selectedNote = action.payload;
    },
    updateSelectedPlan: (state: IUISlice, action: PayloadAction<string>) => {
      state.selectedPlan = action.payload;
    },
    updatePrayerViewFilter: (state: IUISlice, action: PayloadAction<string>) => {
      state.prayerViewFilter = action.payload;
    },
  },
});

export const {
  showSettingsPanel,
  updateDateShowingInActions,
  updateDateShowingInReadingPlan,
  updateSelectedReadingItem,
  updateSelectedNote,
  updateSelectedPlan,
  updatePrayerViewFilter,
} = uiSlice.actions;
export default uiSlice.reducer;

export const selectShowSettings = (state: RootState) => state.ui.settingsShowing;

export const getDateForActions = (state: RootState) => {
  return state.ui.dateShowingInActions ? state.ui.dateShowingInActions : DateTime.now().toISODate();
};

export const getDateForReadingPlan = (state: RootState) => {
  return state.ui.dateShowingInReadingPlan ? state.ui.dateShowingInReadingPlan : DateTime.now().toISODate();
};

export const getSelectedReadingItem = (state: RootState) => {
  return state.ui.selectedReadingItem || '';
};

export const getSelectedNote = (state: RootState) => {
  return state.ui.selectedNote || '';
};

export const getSelectedPlan = (state: RootState) => {
  return state.ui.selectedPlan || '';
};

export const getPrayerViewFilter = (state: RootState) => {
  return state.ui.prayerViewFilter || '';
};
