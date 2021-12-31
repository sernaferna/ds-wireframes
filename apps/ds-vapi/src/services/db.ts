const sqlite3 = require('sqlite3');
import { Database } from 'sqlite3';
import fs from 'fs';
import csv from 'csv-parser';
import { Verse } from '@devouringscripture/common';

export const getDB = (): Database => {
  const db: Database = new sqlite3.Database('db/verses.db', (err: any) => {
    if (err) {
      throw err;
    }
  });

  return db;
};

export const getAllVerses = (): Promise<Verse[]> => {
  return new Promise<Verse[]>((resolve, reject) => {
    const db: Database = getDB();

    db.all('SELECT versenum, osis, apoc FROM verses', (err, rows) => {
      if (err) {
        reject(err);
      }

      const verses: Verse[] = rows.map((row) => ({
        versenum: row.versenum,
        osis: row.osis,
        apocrypha: row.apoc === 1 ? true : false,
      }));
      resolve(verses);
    });
  });
};

export const populateDB = (db: Database) => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS verses ( versenum INTEGER, osis VARCHAR(20), apoc INTEGER)');
    db.run('BEGIN TRANSACTION;');

    fs.createReadStream('data/verses.csv')
      .pipe(csv({ separator: ',' }))
      .on('data', (row) => {
        db.run(
          'INSERT INTO verses (versenum, osis, apoc) VALUES (?, ?, ?)',
          [row.versenum, row.osis, row.apoc],
          (err: any) => {
            if (err) {
              console.error('error inserting into table');
              console.error(err);
            }
          }
        );
      })
      .on('end', () => {
        db.serialize(() => {
          db.run('CREATE INDEX versnumi ON verses(versenum);');
          db.run('CREATE INDEX osisi ON verses(osis);');
          db.run('COMMIT;');
          db.close((err: any) => {
            if (err) {
              console.error('Error closing DB');
              console.error(err);
            }

            console.log('DB created');
          });
        });
      });
  });
};
