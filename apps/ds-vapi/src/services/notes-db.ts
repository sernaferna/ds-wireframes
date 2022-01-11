import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

export const notesDB = new JsonDB(new Config('db/notesDB', true, true, '/'));
