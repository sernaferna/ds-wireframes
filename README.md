# Devouring Scripture Wireframes

This project provides wireframes for the **Devouring Scripture** app. Proper coding practices won't necessarily be followed; the intent is not to produce "good" code, just workable output that shows what the site could look like and how it could work, with some basic demonstration of the functionality.

There are a few projects, along with some libraries for the sake of reducing code duplication:

- `ds-ui` is the user interface -- the actual wireframes
- `ds-api` is a simple API that mocks back-end functions
- `ds-vapi` is a separate API specifically for handling verses and notes, created only because it required a more robust DB than `ds-api`

These apps (as well as the libraries) are described below.

## ds-ui: Devouring Scripture UI

The "main" application, serving up the user interface of the wireframe. Leverages the following technologies:

- The heart of the project is [**React**](https://reactjs.org/) (and the other obvious stuff like **ReactDOM** etc.)
- **Typescript** (just because)
- [**Bootstrap**](https://getbootstrap.com/), [**React-Bootstrap**](https://react-bootstrap.github.io/), [**React Bootstrap Icons**](https://github.com/ismamz/react-bootstrap-icons) (because it's easier), and **Sass**
- [**Redux**](https://redux.js.org/) and [**Redux Toolkit**](https://redux-toolkit.js.org/), including **RTK Query** for talking to the APIs

No DevOps, little-to-no automation, just the React app and the basic, bare-bones scripts to start it in dev mode.

## ds-api: Devouring Scripture API

This project serves as the main back-end API to service the UI, the majority of which is written in [**Express**](https://expressjs.com/). In the real world this would be broken up into microservices for different domains of functionality, but for the sake of providing mock APIs for the UI to talk to it was easier to just create one. (With a caveat for **ds-vapi**, discussed next.)

Anything that isn't hard-coded might as well be, and coding practices aren't intended to be followed; it's not "real" code.

Uses [**Node JSON DB**](https://github.com/Belphemur/node-json-db) under the covers, which reads from a local JSON file (`dsDB.json` in the root folder of the project). The data file is not checked into source control (in case sensitive data ever gets stored during testing), but there is a sample file in `src/helpers/dsDB.json` that can be copied to the root directory as a starting point (or to start over if a lot of garbage data ends up in the "DB"). This library was specifically chosen for **hack-ability**: the JSON file can easily be modified, or different versions swapped back and forth, for testing purposes.

## ds-vapi: Devouring Scripture Verse API

This project (also mostly written with **Express**) serves up a separate API specifically for working with Bible **verses** and user-captured **notes**. It maintains a DB of all of the verses in the Bible (~38k of them), which can be used for determining if one passage falls within another, as well as for creating Reading Plans. This usage demanded a slightly better approach to a DB than a JSON-based version, so [**SQLite3**](https://github.com/TryGhost/node-sqlite3), a relational DB, was chosen for storing verses. (**Node JSON DB** is still used for storing notes; again, hack-ability.)

The SQLite DB isn't checked into source control, but the first time the API is launched it will create it and load all of the verses from `data/verses.csv`.

Along with ignoring the `dsDB.json` file, the `.gitignore` file will also ignore a file named `backupDB.json`, so developers can create two versions of the data file for swapping back and forth without them ending up in GitHub.

## common

A library with common code leveraged across the other applications. It exposes commonly used type definitions that are returned from APIs but also used in the UI app, some error handling code that is used by both of the APIs, and anything else that could be refactored out so that the same code wasn't being written multiple times.

## remark-plugins

For inputs that accept **markdown**, the application leverages the `@uiw/react-md-editor` library, which accepts **Remark** plugins that can further enhance the way MD is converted to HTML. This library provides a set of these plugins, to provide some specialized use cases.

### Bible Reference/OSIS Parsing

Part of the common functionality is a set of functions for parsing and working with Bible passage references. It can:

- Determine if a reference is **valid**; e.g.
  - `James 1:19` is valid
  - `James 1:1-19` is valid
  - `Blah 53:13` is not because "Blah" isn't a recognized book
  - `James 7:5` is not because James only has 5 chapters
- Return an **OSIS string** for a reference string (e.g. `James 1:19` returns `Jas.1.19`)
- Return a readable reference string for an OSIS string (e.g. `Jas.1.19` returns `James 1:19`)

To clear up some of what was just described, here's some commonly used terminology being used across this project:

<!-- prettier-ignore -->
| Term | Description | Examples |
|--|--|--|
| **Passage** | A generic term for a set of verses in Scripture; a single verse, a range of verses, or even an array of ranges of verses. Because we need a means of referring to a passage, this app uses either an **OSIS** string or a human-readable **reference** string. | N/A |
| **OSIS** | A specially formatted string for labeling a passage of Scripture, used in the **OSIS** XML standard for marking up Bible passages. This library doesn't use the OSIS XML format, it just uses the part of the standard around naming/labeling Bible passages -- mostly because the underlying libraries being leveraged do so, and the format is a handy standard to use for machine-readable passage references. Essentially works out to a shortened description of a book (e.g. `Jas` for `James` or `1Cor` for `1 Corinthians`), then the chapter number, then the verse number, separated by periods. Ranges are separated by dashes, and multiple ranges are separated by commas. | `Jas.1.1` for James 1:1; `1Cor.2.5` for 1 Corinthians 2:5; `Jas.1.1-Jas.1.5,1Cor.2.4-1Cor.2.5` for two ranges of James 1:1-5 and 1 Corinthians 2:4-5 |
| **Reference** | A human-readable string for labeling a passage of Scripture, following the conventions most English speaking people are used to. | `James 1:1`, `1 Corinthians 2:5`, `James 1:1-5, 1 Corinthians 2:4-5` |
| **Range** | A set of verses with a beginning and an end. Some APIs and some UI work with arrays of ranges. | `Gen.1.1-Gen.1.2` is a range of 2 verses; `Gen.1.1` is a range of one verse. Code working with ranges might record `Gen.1.1` as a range with the same starting and ending point. |
| Verse | A single verse. |  |

This library makes heavy use of the [**Bible Passage Reference Parser**](https://github.com/openbibleinfo/Bible-Passage-Reference-Parser) and [**Bible Reference Formatter**](https://github.com/openbibleinfo/Bible-Reference-Formatter) libraries. In fact, a number of these functions are just light wrappers over those underlying libraries, which do the heavy lifting. Helper functions like `isPassageRefValid()` (returning a simple Boolean as opposed to a complicated object or OSIS string that need to be parsed) are easier to use in the wireframe.

Some _very_ basic [**Jest**](https://jestjs.io/) unit cases were added for some of the functions, but only where it was deemed to be a time saver.

# Common Commands

Some common command-line tools developers might need.

## Start a Session

A script has been defined in the root `package.json` so that the UI and underlying APIs can be launched from a terminal in the root folder simply by:

```bash
npm start
```

Of course, this means that the logs from all three applications -- `ds-ui`, `ds-api`, and `ds-vapi` -- get mashed into one terminal window, and all get started/stopped together. If desired the projects can be launched independently, in separate terminals, with the following commands (still from the root):

```bash
npm start -w ds-api
npm start -w ds-vapi
npm start -w ds-ui
```

## Run a Test

The very few unit tests that were written run all at once; the root `package.json` has a `test` script that calls the individual test scripts.

```bash
npm run test
```

## Run a Build

All of the libraries can be built at once, using a script defined in the main `package.json`:

```bash
npm run build
```

It's best to shut down the application(s) (if running), run the build, and then reload VS Code to get the latest changes.

### Run a Build of remark-plugins

There are issues getting the **remark-plugins** library to build; the build sometimes hangs when changes are made. There is likely a misconfiguration somewhere in a `tsconfig` or other file.

In order to get **remark-plugins** to build, it has to be built individually; assuming the developer is starting from the root directory, they would need to:

```bash
# attempting to run the build will hang; this doesn't work:
npm run build

# go to the directory of the library
cd packages/remark-plugins

# deleting the build folder seems to help
rm -r -f build/

# run the build only for this library
npm run build
```

After this, builds can be run normally again:

```bash
# go back to root
cd ../..

# running the build normally works now!
npm run build
```

## Git Branching

This might be unprofessional but the original author kept Googling some commonly used Git commands over and over, and figured it would be easier to just write them here. These are the most commonly used Git commands, including some that are _so_ common that everyone knows them instinctively but they're included for completeness.

```bash
# create and checkout a new branch
git checkout -b newBranchName

# commit staged files with a comment
git commit -m "comment"

# commit all staged AND unstaged changes with a comment
git commit -am "comment"

# push to GitHub
git push origin branchName

# get latest changes from GitHub
git pull origin branchName

# Merge code locally
git checkout destinationBranch
git merge sourceBranch

# delete a local branch
git branch -d localBranchName

# delete a remote branchh
git push origin --delete remoteBranchName
```

# Workflow

This process is used for making changes.

Firstly, a GitHub **Project** is used for tracking any changes to be made, bugs to be fixed, etc. It's essentially a backlog, but when any item in the Project is going to be actively worked on it is converted to an **Issue** (along with being moved to the appropriate swimlane in the Project).

Then, for working with the actual code in Git, the following process is typically followed:

1. On the local developer machine:
   1. Create and check out a new branch. (For changes to fix a single Issue, such as a simple bug fix, naming the branch after the issue (e.g. `is110`) is acceptable.)
   1. Make whatever changes are necessary, committing along the way. Commit comments are important: commits containing the word `major` will force a major version change in a later step, and steps containing the word `minor` will force a minor version change. Any other changes will result in a patch change to version number.
   1. When everything is working, Push to GitHub, still on the new branch
1. In GitHub:
   1. Create a Pull Request to merge the code into `main`
   1. Link Issues that are fixed with this PR (if any).
      1. Preference is to link via the PR comments; i.e. to link the PR with Issue 130, the comments should include `closes #130`. This will link the text of the comment to the Issue itself.
      1. Node version numbers for any of the three applications that were modified will be updated automatically, according to these rules listed above. The overall workspace also has a version which will be incremented, and the main workspace version will become the Git tag. (Workspace version will be incremented even if none of the applications are; e.g. changes to the readme would still increment the workspace version.)
   1. Approve the PR.
   1. Wait for all GitHub actions to complete, since source code in the main branch will be updated.
1. Back on the local developer machine
   1. Checkout `main` and Pull from GitHub (which will include the code modified by GitHub Actions).
   1. **Optional**: If finished with the branch, delete it locally and on GitHub with the commands listed above.

_Of course, deleting the branch in GitHub could be done from the website instead of the command line, but since the local branch is already being deleted there anyway, both can be done at once._

After this, if there are other branches active, they may need to merge in the changes from `main`.

Issues linked to the PR are automatically closed in GitHub, and there is a filter in the Project to hide closed items, so approving the PR cleans up all of the project-related workflow.
