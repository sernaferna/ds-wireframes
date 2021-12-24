This project serves as a back-end API to service the **ts-wireframe** project. Anything that isn't hard-coded might as well be, and coding practices aren't intended to be followed; it's not "real" code.

Uses **node-json-db** under the covers, which reads from a local JSON file (`dsDB.json`). The data file is not checked into source control (_just in case_ sensitive data ever gets added there during testing), but there is a sample file in `src/helpers/dsDB.json` that can be copied to the root directory for testing purposes if there is a desire to start from scratch.
