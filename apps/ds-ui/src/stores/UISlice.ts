import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';
import { DateTime } from 'luxon';

export interface IUISlice {
  dateShowingInActions?: string;
  dateShowingInReadingPlan?: string;
  selectedPlan?: string;
  prayerViewFilter?: string;
}

const initialState: IUISlice = {};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    updateDateShowingInActions: (state: IUISlice, action: PayloadAction<string>) => {
      state.dateShowingInActions = action.payload;
    },
    updateDateShowingInReadingPlan: (state: IUISlice, action: PayloadAction<string>) => {
      state.dateShowingInReadingPlan = action.payload;
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
  updateDateShowingInActions,
  updateDateShowingInReadingPlan,
  updateSelectedPlan,
  updatePrayerViewFilter,
} = uiSlice.actions;
export default uiSlice.reducer;

export const getDateForActions = (state: RootState) => {
  return state.ui.dateShowingInActions ? state.ui.dateShowingInActions : DateTime.now().toISODate();
};

export const getDateForReadingPlan = (state: RootState) => {
  return state.ui.dateShowingInReadingPlan ? state.ui.dateShowingInReadingPlan : DateTime.now().toISODate();
};

export const getSelectedPlan = (state: RootState) => {
  return state.ui.selectedPlan || '';
};

export const getPrayerViewFilter = (state: RootState) => {
  return state.ui.prayerViewFilter || '';
};
