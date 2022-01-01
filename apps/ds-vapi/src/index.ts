import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { getAllVersesRouter } from './routes/verses/getAll';
import { getRangeOfVersesRouter } from './routes/verses/getRange';
import { handleFourOhFour } from '@devouringscripture/common';
import { getDB, populateDB } from './services/db';
import { Database } from 'sqlite3';

console.log('VAPI starting');

dotenv.config();

if (!process.env.PORT) {
  console.error('No listening port configured');
  process.exit();
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const db: Database = getDB();
console.log('Connected to DB');

db.serialize(() => {
  db.get('SELECT COUNT(versenum) c FROM verses', (err: any, row: any) => {
    if (err) {
      populateDB(db);
    }
    if (row.c < 1) {
      console.log(`Count returned ${row.c}: creating/populating DB`);
      populateDB(db);
    }
  });
});

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/vapi/v', [getAllVersesRouter, getRangeOfVersesRouter]);

app.use(handleFourOhFour);

app.listen(PORT, () => {
  console.log(`VAPI started listening on port ${PORT}`);
});
