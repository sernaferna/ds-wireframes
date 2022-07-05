# ds-vapi: Devouring Scripture Verse API

This project (written with [**Express**](https://expressjs.com/)) serves up an API specifically for working with **Bible verses** and user-captured **notes**. It maintains a DB of all of the verses in the Bible (~38k of them), which can be used for determining if one passage falls within another, as well as for creating Reading Plans.

This usage demanded a slightly better approach to a DB than a JSON file, so [**SQLite3**](https://github.com/TryGhost/node-sqlite3), a relational DB, was chosen for storing verses. ([**Node JSON DB**](https://github.com/Belphemur/node-json-db) is used for storing notes other data, similar to **ds-api**, providing hack-ability since the JSON file can easily be hand-edited for testing purposes.)

The SQLite DB isn't checked into source control but the first time the API is launched it will create it and load all of the verses from `data/verses.csv`.

Along with ignoring the `dsDB.json` file, the `.gitignore` file will also ignore a file named `backupDB.json`, so developers can create two versions of the data file for swapping back and forth without them ending up in GitHub.
