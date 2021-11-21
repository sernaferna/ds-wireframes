import { configureStore } from '@reduxjs/toolkit';
import prayerReducer from './PrayerSlice';

const store = configureStore({
  reducer: {
    prayer: prayerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
