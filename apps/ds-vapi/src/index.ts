import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { getAllVersesRouter } from './routes/verses/getAll';
import { getRangeOfVersesRouter } from './routes/verses/getRange';
import { getBoundsForPassageRouter } from './routes/verses/getBoundsForPassage';
import { getVersesForOsisRouter } from './routes/verses/getForOsis';

import { createNewNoteRouter } from './routes/notes/newItem';
import { getAllNotesRouter } from './routes/notes/getAll';
import { getAllNotesInRangeRouter } from './routes/notes/getAllInRange';
import { getNoteByIDRouter } from './routes/notes/byId';
import { updateNoteRouter } from './routes/notes/update';
import { deleteNoteRouter } from './routes/notes/delete';
import { getNotesForPassageRouter } from './routes/notes/getAllForPassage';

import { NotFoundError, errorHandler, logAPICall, writeLog } from '@devouringscripture/common';
import { getDB, populateDB } from './services/db';
import { Database } from 'sqlite3';

writeLog('VAPI starting');

dotenv.config();

if (!process.env.PORT) {
  writeLog('No listening port configured', undefined, undefined, 'ERROR');
  process.exit();
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const db: Database = getDB();
writeLog('Connected to DB');

db.serialize(() => {
  db.get('SELECT COUNT(versenum) c FROM verses', (err: any, row: any) => {
    if (err) {
      populateDB(db);
    }
    if (!row) {
      populateDB(db);
    }
    if (row.c < 1) {
      writeLog(`Count returned ${row.c}: creating/populating DB`);
      populateDB(db);
    }
  });
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(logAPICall);

app.use('/vapi/v', [getAllVersesRouter, getRangeOfVersesRouter, getBoundsForPassageRouter, getVersesForOsisRouter]);

app.use('/vapi/n', [
  createNewNoteRouter,
  getAllNotesRouter,
  getAllNotesInRangeRouter,
  getNoteByIDRouter,
  updateNoteRouter,
  deleteNoteRouter,
  getNotesForPassageRouter,
]);

app.all('*', (req, res, next) => {
  return next(new NotFoundError(`${req.method}: ${req.originalUrl}`));
});
app.use(errorHandler);

app.listen(PORT, () => {
  writeLog(`VAPI started listening on port ${PORT}`);
});
