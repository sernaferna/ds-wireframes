import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './UISlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { prayerApi } from '../services/PrayerService';
import { userApi } from '../services/UserService';

const store = configureStore({
  reducer: {
    [prayerApi.reducerPath]: prayerApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(prayerApi.middleware).concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

setupListeners(store.dispatch);
