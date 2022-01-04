const sqlite3 = require('sqlite3').verbose();
import { Database } from 'sqlite3';
import fs from 'fs';
import csv from 'csv-parser';
import { Verse, DatabaseError, InvalidPassageError } from '@devouringscripture/common';

// TODO need a standard query function, that will standardize error handling and closing connections
export const getDB = (): Database => {
  const db: Database = new sqlite3.Database('db/verses.db', (err: any) => {
    if (err) {
      throw new DatabaseError('getDB');
    }
  });

  return db;
};

export const getVersesByNum = (lowerBound: number = 0, upperBound: number = 40000): Promise<Verse[]> => {
  return new Promise<Verse[]>((resolve, reject) => {
    const db: Database = getDB();

    db.all(
      'SELECT versenum, osis, apoc FROM verses WHERE versenum >= ? AND versenum <= ?',
      [lowerBound, upperBound],
      (err, rows) => {
        if (err) {
          db.close();
          reject(new DatabaseError('getVersesByNum'));
        }

        const verses: Verse[] = rows.map((row) => ({
          versenum: row.versenum,
          osis: row.osis,
          apocrypha: row.apoc === 1 ? true : false,
        }));
        db.close();
        resolve(verses);
      }
    );
  });
};

export const getVerseByOSIS = (osis: string): Promise<Verse> => {
  return new Promise<Verse>((resolve, reject) => {
    const db: Database = getDB();

    db.get('SELECT versenum, osis, apoc FROM verses WHERE osis = ?', [osis], (err, row) => {
      if (err) {
        db.close();
        reject(new DatabaseError('getVerseByOSIS'));
      }

      if (!row) {
        db.close();
        reject(new InvalidPassageError(osis));
      }

      const verse: Verse = { versenum: row.versenum, osis: row.osis, apocrypha: row.apoc === 1 ? true : false };
      db.close();
      resolve(verse);
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
              throw new DatabaseError('populateDB');
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
              throw new DatabaseError('closing DB conn in populateDB');
            }

            console.log('DB created');
          });
        });
      });
  });
};
