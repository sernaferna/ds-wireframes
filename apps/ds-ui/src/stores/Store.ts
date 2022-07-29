import { configureStore } from '@reduxjs/toolkit';
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

const store = configureStore({
  reducer: {
    [prayerApi.reducerPath]: prayerApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [actionsApi.reducerPath]: actionsApi.reducer,
    [passageApi.reducerPath]: passageApi.reducer,
    [vapiApi.reducerPath]: vapiApi.reducer,
    [instantiatedPlanApi.reducerPath]: instantiatedPlanApi.reducer,
    [planApi.reducerPath]: planApi.reducer,
    [tutorialApi.reducerPath]: tutorialApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
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

setupListeners(store.dispatch);
