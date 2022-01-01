import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
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
import { newReadingPlan } from './routes/read/plans/new';
import { handleFourOhFour } from '@devouringscripture/common';

console.log('API starting');

dotenv.config();

if (!process.env.PORT) {
  console.error('no port environment variable');
  process.exit();
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/pi', [getAllPrayerItemsRouter, getPIById, markReadRouter, newPrayerItemRouter, deletePrayerItemRouter]);
app.use('/api/user', [getUserByIdRouter, updateUserRouter]);
app.use('/api/actions/entries', [
  getRecentActionsRouter,
  getActionForDateRouter,
  markActionItemForDateRouter,
  getActionsForMonthRouter,
  getActionStatsRouter,
  getActionByIdRouter,
]);
app.use('/api/actions/custom', [getAllCustomActionsRouter, newCustomActionTypeRouter, deleteCustomActionRouter]);
app.use('/api/read/current', [getCurrentlyReadingPassages, newReadingItem, deleteCurrentReadItem]);
app.use('/api/plans', [newReadingPlan]);

app.use(handleFourOhFour);

app.listen(PORT, () => {
  console.log(`App started. Listening on port ${PORT}`);
});
