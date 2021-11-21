import { configureStore } from '@reduxjs/toolkit';
import prayerReducer from './PrayerSlice';
import uiReducer from './UISlice';

const store = configureStore({
  reducer: {
    prayer: prayerReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
