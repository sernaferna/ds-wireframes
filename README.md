# Devouring Scripture Wireframes

This project provides wireframes for the **Devouring Scripture** website. Proper coding practices won't necessarily be followed; the intent is not to produce "good" code, just workable HTML that shows what the site could look like, with some basic demonstration of how the functionality could work.

There are a few actual **projects**, along with some libraries for the sake of reducing code duplication:

- `ds-ui` is the user interface -- the actual wireframes
- `ds-api` is a simple, mostly hard-coded API, mocking back-end functions
- `ds-vapi` is a separate API specifically for handling verses, created only because it required a better DB than the JSON-based DB used by `ds-api`

## ds-ui: Devouring Scripture UI

The "main" application, serving up the user interface of the wireframe. Leverages the following technologies:

- The heart of the project is `react` (and the other obvious stuff like `react-dom` etc.)
- Typescript (just because)
- `bootstrap`, `react-bootstrap`, `react-bootstrap-icons` (because it's easier), `styled-components`, and Sass
- `redux` and `redux-toolkit`, including `RTK Query` for talking to the APIs (even though it's all just fake state)

No automated testing, no automated deployments, no automated _anything,_ just the React app and the basic, bare-bones scripts to just start it in dev mode.

## ds-api: Devouring Scripture API

This project serves as a back-end API to service the React project. In the real world this would be broken up into a few microservices for different parts of functionality, but for the sake of providing mock APIs for **ds-ui** to talk to it was easier to just create one. (With a caveat for **ds-vapi**, discussed next.)

Anything that isn't hard-coded might as well be, and coding practices aren't intended to be followed; it's not "real" code.

Uses **node-json-db** under the covers, which reads from a local JSON file (`dsDB.json` in the root folder of the project). The data file is not checked into source control (_just in case_ sensitive data ever gets added there during testing), but there is a sample file in `src/helpers/dsDB.json` that can be copied to the root directory as a starting point. This won't be the most performant DB around, but it was specifically chosen for hack-ability -- values can easily be inserted into this file manually to enable testing, since it's easier to do so in a text file than it would be in a relational DB.

## ds-vapi: Devouring Scripture Verse API

This project serves up a separate API specifically for working with Bible **verses**. It maintains a DB of all of the verses in the Bible (~38k of them), which can be used for determining if one passage falls within another, as well as for creating Reading plans. This usage demanded a slightly better approach to a DB than a JSON-based version, so this project uses **sqlite3** under the covers as a relational DB.

The actual DB isn't checked into source control, but the first time this API is launched it will created it and load all of the verses from `data/verses.csv`.

## common

This is just a library with common code. It exposes commonly used type definitions that are returned from APIs but also used in the UI app, some error handling code that are used by both of the APIs, and anything else that could be refactored out so that the same code wasn't being written multiple times.

## refparse

A library for parsing and working with Bible passage references. It can:

- Determine if a passage is **valid**; e.g.
  - `James 1:19` is valid
  - `James 1:1-19` is valid
  - `blah 53:13` is not because "blah" isn't a passage
  - `James 7:5` is not because James only has 5 chapters
- Return an **OSIS string** for a readable string (e.g. `James 1:19` returns `Jas.1.19`)
- Return a readable string for an OSIS string (e.g. `Jas.1.19` returns `James 1:19`)

That "OSIS string" thing could probably use some explaining! There are two types of string being worked with, which this library attempts to use consistently:

<!-- prettier-ignore -->
| Type | Description | Examples |
|--|--|--|
| **OSIS String** | A specially formatted string for labeling a passage of Scripture, used in the **OSIS** XML standard for marking up Bible passages. This `refparse` library doesn't use the OSIS XML format, it just uses the part of the standard around naming/labeling Bible passages -- mostly because the underlying libraries being leveraged do so, and the format is a handy standard to use for reliable passage references. Essentially works out to a shortened description of a book (e.g. `Jas` for `James` or `1Cor` for `1 Corinthians`), then the book, then the verse, separated by periods. | `Jas.1.1`, `1Cor.2.5` |
| **Reference** | A human-readable string for labeling a passage of Scripture, following the conventions most English speaking people are used to. | `James 1:1`, `1 Corinthians 2:5` |

This library makes heavy use of the `bible-passage-reference-parser` and `bible-reference-formatter` libraries under the covers. In fact, in many instances it's nothing more than a light wrapper over those libraries, which do all of the heavy lifting, but helper functions like `isPassageRefValid()` (returning a simple Boolean as opposed to a complicated object or OSIS string) are easier to use in the wireframe.

# Common Commands

Very unprofessional, but the original author kept looking up the following common commands, and figured it would be easier to just write them here.

## Start a Session

A script has been defined in the root `package.json` so that the UI (along with the underlying APIs) can be launched from a terminal in the root folder simply by:

```bash
npm start
```

Of course, this means that the logs from all three applications get mashed into one terminal window. If desired the projects can be launched independently instead, in separate terminals, with the following commands (still from the root):

```bash
npm start -w ds-api
npm start -w ds-vapi
npm start -w ds-ui
```

As mentioned above, this code isn't intended to be production-worthy (or even "good"), so not many test cases have been written, so `npm test` commands aren't really stressed at the root level.

## Git Branching

Some commands for working with source control that the original author kept Googling over and over.

```bash
# create a new branch
git checkout -b newBranchName

# Merge code
git checkout destinationBranch
git merge sourceBranch

# delete a local branch
git branch -d localBranchName

# delete a remote branchh
git push origin --delete remoteBranchName
```
