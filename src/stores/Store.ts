import { configureStore } from '@reduxjs/toolkit';
import prayerReducer from './PrayerSlice';
import uiReducer from './UISlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

export const rootReducer = combineReducers({
  prayer: prayerReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export default store;
