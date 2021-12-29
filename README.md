# Devouring Scripture Wireframes

This project provides wireframes for the **Devouring Scripture** website. Proper coding practices won't necessarily be followed; the intent is not to produce "good" code, just workable HTML that shows what the site could look like.

There are a couple of "main" projects (along with libraries just for the sake of reducing code duplication):

- `ds-ui` is the user interface -- the actual wireframes
- `ds-api` is a simple, mostly hard-coded API

## ds-ui

Leverages the following technologies:

- `react` (and the other obvious stuff like `react-dom` etc.)
- Typescript (just because)
- `bootstrap`
- `react-bootstrap` and `react-bootstrap-icons` (because it's easier), along with `styled-components`
- `redux` and `redux-toolkit` (even though it's all just fake state)

No automated testing, no automated deployments, no automated _anything,_ just the React app.

## ds-api

This project serves as a back-end API to service the React project. Anything that isn't hard-coded might as well be, and coding practices aren't intended to be followed; it's not "real" code.

Uses **node-json-db** under the covers, which reads from a local JSON file (`dsDB.json`). The data file is not checked into source control (_just in case_ sensitive data ever gets added there during testing), but there is a sample file in `src/helpers/dsDB.json` that can be copied to the root directory as a starting point for testing purposes if there is a desire to start from scratch.

## common

This is just a library with common code (e.g. commonly used type definitions that are returned from APIs but also used in the UI app).

## refparse

A library for parsing and working with Bible passage references. It can:

- Determine if a passage is **valid**; e.g.
  - `James 1:19` is valid
  - `James 1:1-19` is valid
  - `blah 53:13` is not because "blah" isn't a passage
  - `James 7:5` is not because James only has 5 chapters
- Return an OSIS string for a readable string (e.g. `James 1:19` returns `Jas.1.19`)
- Return a readable string for an OSIS string (e.g. `Jas.1.19` returns `James 1:19`)

In effect, there are two types of string being worked with, which this library attempts to use consistently:

| Type            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Example     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| **OSIS String** | A specially formatted string for labeling a passage of Scripture, used in the **OSIS** XML standard for marking up Bible passages. This library doesn't use the OSIS XML format, it just uses the part of the standard around naming/labeling Bible passages -- mostly because the underlying libraries being leveraged do so, and the format is a handy standard to use. Essentially works out to a three-character description of a book (e.g. `Jas` for `James`), then the book, then the verse, separated by periods. | `Jas.1.1`   |
| **Reference**   | A human-readable string for labeling a passage of Scripture, following the conventions most English speaking people are used to.                                                                                                                                                                                                                                                                                                                                                                                          | `James 1:1` |

This library makes heavy use of the `bible-passage-reference-parser` and `bible-reference-formatter` libraries under the covers.

# Notes to self

Very unprofessional, but the original author kept looking up the following common commands, and figured it would be easier to just write them here.

## Start a Session

From the root:

```bash
npm start -workspaces --if-defined
```

**Note:** For whatever reason that command isn't working; the API doesn't seem to start. So instead the following commands _both_ need to be run (from separate terminals):

```bash
npm start -w ds-ui
npm start -w ds-api
```

## Git Branching

Create branch:

```bash
git checkout -b newBranchName
```

Merge code from a changed branch into the current branch:

```bash
git checkout destinationBranch
git merge sourceBranch
```

Delete branches (local and remote):

```bash
// delete locally
git branch -d localBranchName

//delete remote
git push origin --delete remoteBranchName
```
