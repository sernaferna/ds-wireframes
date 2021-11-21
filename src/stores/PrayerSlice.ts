import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { PrayerListItem } from '../datamodel/PrayerListItem';
import { PrayerListAPI } from '../mocks/apis/PrayerListAPI';
import { RootState } from './Store';

export interface IPrayerState {
  loaded: boolean;
  items: PrayerListItem[];
}

export interface IMarkCompleteInterface {
  id: string;
  complete: boolean;
}

const initialState: IPrayerState = {
  loaded: false,
  items: [],
};

export const fetchAllPrayerItems = createAsyncThunk('prayer/fetchAll', async () => {
  return PrayerListAPI.getPrayerItems();
});

export const prayerSlice = createSlice({
  name: 'prayer',
  initialState: initialState,
  reducers: {
    markComplete: (state: IPrayerState, action: PayloadAction<IMarkCompleteInterface>) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].completed = action.payload.complete;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPrayerItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
  },
});

export const { markComplete } = prayerSlice.actions;

export default prayerSlice.reducer;

// selectors
export const selectPrayerState = (state: RootState) => state.prayer;

export const selectPrayerStoreActiveitems = createSelector(selectPrayerState, (pState) => ({
  loaded: pState.loaded,
  items: pState.items.filter((item) => !item.completed),
}));
