# Devouring Scripture Wireframes

This project provides wireframes for the **Devouring Scripture** website. Proper coding practices won't necessarily be followed; the intent is not to produce "good" code, just workable HTML that shows what the site could look like.

Leverages the following technologies:

- `react` (and the other obvious stuff like `react-dom` etc.)
- Typescript (just because)
- `bootstrap`
- `react-bootstrap` and `react-bootstrap-icons` (because it's easier), along with `styled-components`
- `redux` and `redux-toolkit` (even though it's all just fake state)
- `bible-passage-reference-parser` for parsing out Bible passages entered in the UI

No automated testing, no automated deployments, no automated _anything,_ just the React app.

# Notes to self

Very unprofessional, but the original author kept looking up the following common commands, and figured it would be easier to just write them here.

## Start a Session

From the `ds-wf-be` project:

```bash
npm run dev
```

From this project:

```bash
npm start
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
