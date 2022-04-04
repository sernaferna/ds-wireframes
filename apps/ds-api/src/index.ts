import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { getAllPrayerItemsRouter } from './routes/prayer/getAll';
import { getPIById } from './routes/prayer/byId';
import { markReadRouter } from './routes/prayer/markRead';
import { newPrayerItemRouter } from './routes/prayer/newItem';
import { deletePrayerItemRouter } from './routes/prayer/delete';

import { getUserByIdRouter } from './routes/user/byId';
import { updateUserRouter } from './routes/user/update';

import { getAllCustomActionsRouter } from './routes/actions/custom/getAll';
import { newCustomActionTypeRouter } from './routes/actions/custom/newItem';

import { getRecentActionsRouter } from './routes/actions/getRecent';
import { getActionForDateRouter } from './routes/actions/getForDate';
import { markActionItemForDateRouter } from './routes/actions/markItemForDate';
import { getActionByIdRouter } from './routes/actions/byId';
import { getActionsForMonthRouter } from './routes/actions/getForMonth';
import { getActionStatsRouter } from './routes/actions/getStats';
import { deleteCustomActionRouter } from './routes/actions/custom/delete';

import { getCurrentlyReadingPassages } from './routes/read/passages/getCurrent';
import { newReadingItem } from './routes/read/passages/newItem';
import { deleteCurrentReadItem } from './routes/read/passages/delete';
import { getPassageByIdRouter } from './routes/read/passages/byId';

import { getAllPublicPlansRouter } from './routes/plans/getAll';
import { deletePublicPlanRouter } from './routes/plans/delete';
import { getPublicPlanByIdRouter } from './routes/plans/byId';
import { publishPlanRouter } from './routes/plans/publish';
import { savePlanRouter } from './routes/plans/save';

import { deleteInstantiatedPlanRouter } from './routes/instantiatedPlans/delete';
import { getAllInstantiatedPlansRouter } from './routes/instantiatedPlans/getAll';
import { newIPRouter } from './routes/instantiatedPlans/new';
import { updateInstantiatedPlanRouter } from './routes/instantiatedPlans/update';
import { getSubscribedIPRouter } from './routes/instantiatedPlans/getSubscribed';

import { errorHandler, NotFoundError } from '@devouringscripture/common';

console.log('API starting');

dotenv.config();

if (!process.env.PORT) {
  console.error('no port environment variable');
  process.exit();
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
// app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/pi', [getAllPrayerItemsRouter, getPIById, markReadRouter, newPrayerItemRouter, deletePrayerItemRouter]);
app.use('/api/user', [getUserByIdRouter, updateUserRouter, getAllInstantiatedPlansRouter]);
app.use('/api/actions/entries', [
  getRecentActionsRouter,
  getActionForDateRouter,
  markActionItemForDateRouter,
  getActionsForMonthRouter,
  getActionStatsRouter,
  getActionByIdRouter,
]);
app.use('/api/actions/custom', [getAllCustomActionsRouter, newCustomActionTypeRouter, deleteCustomActionRouter]);
app.use('/api/read/current', [
  getCurrentlyReadingPassages,
  newReadingItem,
  deleteCurrentReadItem,
  getPassageByIdRouter,
]);
app.use('/api/plans/public', [
  getAllPublicPlansRouter,
  deletePublicPlanRouter,
  getPublicPlanByIdRouter,
  publishPlanRouter,
  savePlanRouter,
]);
app.use('/api/ip', [
  deleteInstantiatedPlanRouter,
  getAllInstantiatedPlansRouter,
  newIPRouter,
  updateInstantiatedPlanRouter,
  getSubscribedIPRouter,
]);

app.all('*', async (req, res, next) => {
  return next(new NotFoundError(`${req.method}: ${req.originalUrl}`));
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App started. Listening on port ${PORT}`);
});
