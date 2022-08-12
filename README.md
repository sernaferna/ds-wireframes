# Devouring Scripture Wireframes

This monorepos provides wireframes (and supporting applications/libraries) for the **Devouring Scripture** app. Proper coding practices won't necessarily be followed; the intent is not to produce "good" code, just workable output that shows what the site could look like and how it could work, with some basic demonstration of the functionality.

The projects and libraries are:

- Projects:
  - `ds-ui` is the user interface -- the actual wireframes, and the heart of this monorepo
  - `ds-api` is a simple API that mocks back-end functionality
  - `ds-vapi` is a separate API specifically for handling verses and notes, created only because it required a more robust DB than `ds-api`
- Libraries:
  - `@devouringscripture/common` is a library that provides common type definitions and code

# Common Commands

Some common command-line tools are highlighted here.

## Start a Session

In order for **ds-ui** to function, both APIs must also be running.

A script has been defined in the root `package.json` so that all three applications can be launched from a terminal in the root folder simply by:

```bash
npm start
```

Of course, this means that the logs from all three applications -- `ds-ui`, `ds-api`, and `ds-vapi` -- get mashed into one terminal window, and all get started/stopped together.

If desired the projects can be launched independently, in separate terminals, with the following commands (still from the root):

```bash
npm start -w ds-api
npm start -w ds-vapi
npm start -w ds-ui
```

The APIs don't depend on each other, but the UI depends on both APIs being up and running.

## Run a Test

The very few unit tests that were written can be run all at once; the root `package.json` has a `test` script that calls the individual test scripts.

```bash
npm run test
```

## Run a Build

All of the libraries can be built at once, using a script defined in the main `package.json`:

```bash
npm run build
```

For best results, it's best to:

1. Shut down the application(s) (if running)
1. Run the build
1. Reload VS Code (or whatever IDE is being used) to get the latest changes
1. Re-start the applications for the changes to take effect

## Git Branching

These are the most commonly used Git commands that are used in this monorepo, including some that are incredibly common.

```bash
# create and checkout a new branch
git checkout -b newBranchName

# commit staged files with a comment
git commit -m "comment"

# commit all modified files, staged and unstaged, with a comment
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

## GitHub Project

One or more GitHub **Projects** are used for tracking changes to be made, bugs to be fixed, etc. These projects essentially function as backlogs, but when any item in the Project is going to be actively worked on it is converted to an **Issue** (along with being moved to the appropriate swimlane in the Project).

## Branching

The branching strategy is _very_ simple: The `main` branch is the "production" version of the application; branches are created for building new functionality and fixing bugs, then merged back into `main`. There are no test or pre-prod or post-prod branches, just working branches and `main`.

## Versioning

Version numbers are maintained for all three applications, as well as an overall version number for the entire monorepo. These version numbers are incremented automatically whenever code is merged into the `main` branch.

Version numbers are applied at the application level, (based on whether there are commits for that application), as well as at the monorepo level. So, for example, if updates are made to **ds-ui** but not to **ds-api** or **ds-vapi** then **ds-ui** will get its version incremented, but the other applications won't. The version at the monorepo level is _always_ updated, even if none of the applications are updated (e.g. if an update is made to `@devouringscripture/common`).

Versioning is _not_ maintained for the libraries; they are always kept at version `1.0.0`. This reduces the amount of complexity required to keep all applications up to date with all libraries; a simple build is all that's required.

Commit comments are important, because these comments drive the logic for incrementing the versions: commits containing the word `MAJOR` will force a major version change in a later step, and steps containing the word `MINOR` will force a minor version change. Any other changes will result in a patch change to version numbers of impacted projects.

## Process Flow

The following process is typically followed for making and merging changes:

1. On the local developer machine:
   1. Create and check out a new branch. (For changes to fix a single Issue, such as a simple bug fix, naming the branch after the issue (e.g. `is110`) is acceptable.)
   1. Make whatever changes are necessary, committing and Pushing to GitHub along the way.
1. In GitHub:
   1. Create a Pull Request to merge the code into `main`
   1. Link Issues that are fixed with this PR (if any). Preference is to link via the PR comments; i.e. to link the PR with Issue 130, the PR comments should include `Closes #130`.
   1. Approve the PR.
   1. Wait for all GitHub actions to complete, since source code in the main branch will be updated. (This includes the action to increment the version numbers, as discussed above.)
1. Back on the local developer machine
   1. Checkout `main` and Pull from GitHub (which will include the code modified by GitHub Actions).
   1. **Optional**: If finished with the branch, delete it locally and on GitHub with the commands listed above.

_Of course, deleting the branch in GitHub could be done from the website instead of the command line, but since the local branch is already being deleted there anyway, both can be done at once._

After this, if other branches are still active they need to have the changes from `main` merged back in.

Issues linked to the PR are automatically closed in GitHub, and there is a filter in the Project to hide closed items, so approving the PR cleans up all of the project-related workflow.
