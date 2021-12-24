# Devouring Scripture Wireframes

This project provides wireframes for the **Devouring Scripture** website. Proper coding practices won't necessarily be followed; the intent is not to produce "good" code, just workable HTML that shows what the site could look like.

There are a couple of "main" projects (along with libraries just for the sake of reducing code duplication):

- `ds-ui` is the user interface---the actual wireframes
- `ds-wf-be` (DS wireframe back-end) is a simple, mostly hard-coded API

## ds-ui

Leverages the following technologies:

- `react` (and the other obvious stuff like `react-dom` etc.)
- Typescript (just because)
- `bootstrap`
- `react-bootstrap` and `react-bootstrap-icons` (because it's easier), along with `styled-components`
- `redux` and `redux-toolkit` (even though it's all just fake state)
- `bible-passage-reference-parser` for parsing out Bible passages entered in the UI

No automated testing, no automated deployments, no automated _anything,_ just the React app.

## ds-wf-be

This project serves as a back-end API to service the **ts-wireframe** project. Anything that isn't hard-coded might as well be, and coding practices aren't intended to be followed; it's not "real" code.

Uses **node-json-db** under the covers, which reads from a local JSON file (`dsDB.json`). The data file is not checked into source control (_just in case_ sensitive data ever gets added there during testing), but there is a sample file in `src/helpers/dsDB.json` that can be copied to the root directory as a starting point for testing purposes if there is a desire to start from scratch.

## common

This is just a library with common code (e.g. commonly used type definitions that are returned from APIs but also used in the UI app). It is _not_ shared "properly" by other projects, it's a hacked together approach, but at least code doesn't have to be duplicated across projects.

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
npm start -w ds-wf-be
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
