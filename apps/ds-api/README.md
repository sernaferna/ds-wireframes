# ds-api: Devouring Scripture API

This project serves as the main back-end API to service the **ds-ui** application. It is written with [**Express**](https://expressjs.com/).

In the real world this would be broken up into microservices for different domains of functionality, but for the sake of providing mock APIs for the UI to talk to it was easier to just create one. (With a caveat for **ds-vapi**, a separate set of APIs requiring some different underlying technology.)

## node-json-db

This application uses [**Node JSON DB**](https://github.com/Belphemur/node-json-db), a library that lets the application read from a local JSON file as its "database." (For this application it's the `dsDB.json` file in the root folder of the project).

The data file is not checked into source control (in case sensitive data ever gets stored during development/testing), but there is a sample file in `src/helpers/dsDB.json` that _is_ in source control (with no sensitive data in it), which can be copied to the root directory as a starting point (or to start over if a lot of garbage data ends up in the "DB").

This library was specifically chosen for **hack-ability**: the JSON file can easily be modified, or different versions swapped back and forth, for testing purposes.
