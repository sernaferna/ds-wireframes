const sqlite3 = require('sqlite3').verbose();
import { Database } from 'sqlite3';
import fs from 'fs';
import csv from 'csv-parser';
import { Verse, DatabaseError, InvalidPassageError, writeLog } from '@devouringscripture/common';

/**
 * Gets an instance of the SQLite DB
 *
 * @returns The instantiated database
 */
export const getDB = (): Database => {
  const db: Database = new sqlite3.Database('db/verses.db', (err: any) => {
    if (err) {
      throw new DatabaseError('getDB');
    }
  });

  return db;
};

/**
 * Async function to fetch a set of verses, given lower/upper
 * bounds based on the `versenum`.
 *
 * @param lowerBound The lowest verse to fetch
 * @param upperBound The highest verse to fetch
 * @returns [Promise] Array of `Verse` objects matching the params
 */
export const getVersesByNum = (lowerBound: number = 0, upperBound: number = 40000): Promise<Verse[]> => {
  return new Promise<Verse[]>((resolve, reject) => {
    const db: Database = getDB();

    db.all(
      'SELECT versenum, osis, apoc, nt FROM verses WHERE versenum >= ? AND versenum <= ?',
      [lowerBound, upperBound],
      (err, rows) => {
        if (err) {
          db.close();
          return reject(new DatabaseError('getVersesByNum'));
        }

        const verses: Verse[] = rows.map((row) => ({
          versenum: row.versenum,
          osis: row.osis,
          apocrypha: row.apoc === 1 ? true : false,
          newTestament: row.nt === 1 ? true : false,
        }));
        db.close();
        return resolve(verses);
      }
    );
  });
};

/**
 * Retrieve a single verse, based on OSIS string.
 *
 * @param osis OSIS string for which to fetch the verses
 * @returns [Promise] Single verse object, matching the OSIS
 */
export const getVerseByOSIS = (osis: string): Promise<Verse> => {
  return new Promise<Verse>((resolve, reject) => {
    const db: Database = getDB();

    db.get('SELECT versenum, osis, apoc, nt FROM verses WHERE osis = ?', [osis], (err, row) => {
      if (err) {
        db.close();
        return reject(new DatabaseError('getVerseByOSIS'));
      }

      if (!row || row === undefined || row === null) {
        db.close();
        return reject(new InvalidPassageError(osis));
      }

      const verse: Verse = {
        versenum: row.versenum,
        osis: row.osis,
        apocrypha: row.apoc === 1 ? true : false,
        newTestament: row.nt === 1 ? true : false,
      };
      db.close();
      return resolve(verse);
    });
  });
};

/**
 * Populates an empty SQLite DB with table structures and verse
 * data.
 *
 * @param db The SQLite db object
 */
export const populateDB = (db: Database) => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS verses ( versenum INTEGER, osis VARCHAR(20), apoc INTEGER, nt INTEGER)');
    db.run('BEGIN TRANSACTION;');

    fs.createReadStream('data/verses.csv')
      .pipe(csv({ separator: ',' }))
      .on('data', (row) => {
        db.run(
          'INSERT INTO verses (versenum, osis, apoc, nt) VALUES (?, ?, ?, ?)',
          [row.versenum, row.osis, row.apoc, row.nt],
          (err: any) => {
            if (err) {
              writeLog('error inserting into table', undefined, undefined, 'ERROR', err);
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
              writeLog('Error closing DB', undefined, undefined, 'ERROR', err);
              throw new DatabaseError('closing DB conn in populateDB');
            }

            writeLog('DB created');
          });
        });
      });
  });
};
