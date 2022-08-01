import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import uiReducer from './UISlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { prayerApi } from '../services/PrayerService';
import { userApi } from '../services/UserService';
import { actionsApi } from '../services/ActionsService';
import { passageApi } from '../services/PassagesService';
import { vapiApi } from '../services/VapiService';
import { instantiatedPlanApi } from '../services/InstantiatedPlanService';
import { planApi } from '../services/PlanService';
import { tutorialApi } from '../services/TutorialService';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage('devouringScripture'),
};

const reducers = combineReducers({
  [prayerApi.reducerPath]: prayerApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [actionsApi.reducerPath]: actionsApi.reducer,
  [passageApi.reducerPath]: passageApi.reducer,
  [vapiApi.reducerPath]: vapiApi.reducer,
  [instantiatedPlanApi.reducerPath]: instantiatedPlanApi.reducer,
  [planApi.reducerPath]: planApi.reducer,
  [tutorialApi.reducerPath]: tutorialApi.reducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(prayerApi.middleware)
      .concat(userApi.middleware)
      .concat(actionsApi.middleware)
      .concat(passageApi.middleware)
      .concat(vapiApi.middleware)
      .concat(instantiatedPlanApi.middleware)
      .concat(planApi.middleware)
      .concat(tutorialApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

export const persistor = persistStore(store);

setupListeners(store.dispatch);
