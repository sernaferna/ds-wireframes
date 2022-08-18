# Devouring Scripture Wireframes

This monorepo provides wireframes (and supporting applications/libraries) for the **Devouring Scripture** app. Proper coding practices won't necessarily be followed; the intent is not to produce "good" code, just workable output that shows what the site could look like and how it could work, with some basic demonstration of the functionality.

The projects and libraries are:

- Projects:
  - `ds-ui` is the user interface -- the the heart of this monorepo
  - `ds-api` is a simple API that mocks back-end functionality
  - `ds-vapi` is a separate API specifically for handling verses and notes, created only because it required a more robust DB than `ds-api`
- Libraries:
  - `@devouringscripture/common` is a library that provides common type definitions and code

# Common Commands

Some common command-line tools are highlighted here.

## Start a Session

In order for **ds-ui** to function both APIs must also be running. A script has been defined in the root `package.json` to start all three applications at once:

```bash
npm start
```

Of course, this means that the logs from all three applications -- `ds-ui`, `ds-api`, and `ds-vapi` -- get mashed into one terminal window, and all get started/stopped together.

If desired the projects can be launched independently in separate terminals, with the following commands (still from the root):

```bash
npm start -w ds-api
npm start -w ds-vapi
npm start -w ds-ui
```

The APIs don't depend on each other, but the UI depends on both APIs being up and running.

## Run a Test

The very few unit tests that were written can be run from the root:

```bash
npm run test
```

## Run a Build

This just applies to the `@devouringscripture/common` library, but builds can also be run from the root, by:

1. Shutting down the application(s) (if running)
1. Running the build from the root: `npm run build`
1. Reloading VS Code (or whatever IDE is being used) to get the latest changes
1. Re-starting the applications

## Git Branching

These are the most commonly used Git commands used in this monorepo, including some that are incredibly common.

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

# delete a remote branchh
git push origin --delete remoteBranchName

# delete a local branch
git branch -d localBranchName
```

# Workflow

This process is used for making changes.

## GitHub Project

One or more GitHub [Projects](https://github.com/sernaferna/ds-wireframes/projects?type=new) are used for tracking changes to be made, bugs to be fixed, etc. These projects essentially function as backlogs, and when any item in the Project is going to be actively worked on it is converted to an **Issue** (along with being moved to the appropriate swimlane in the Project).

## Branching

The branching strategy is _very_ simple: The `main` branch is the "production" version of the application; feature/issue branches are created for building new functionality and fixing bugs, then merged back into `main`. There are no test or pre-prod or post-prod branches, just working branches and `main`.

## Versioning

Version numbers are maintained for all three applications, as well as an overall version number for the monorepo. Version numbers are incremented automatically whenever code is merged into the `main` branch; at the application level (based on whether there are commits for that application), as well as at the monorepo level (every commit). Even if none of the three applications is updated (e.g. if an update is made to `@devouringscripture/common`), the overall version for the monorepo is still incremented.

Versioning is _not_ maintained for the common library; it is always kept at version `1.0.0`. This reduces the amount of complexity required to keep all applications up to date with all libraries; a simple build (and refresh of the IDE) is all that's required.

Commit comments are important because these comments drive the logic for incrementing the versions: commits containing the word `MAJOR` will force a major version change, and steps containing the word `MINOR` will force a minor version change. Any other changes will result in a patch change to version numbers of impacted projects.

## Process Flow

The following process is typically followed for making and merging changes:

1. On the local developer machine:
   1. Create and check out a new branch. (For changes to fix a single Issue, such as a simple bug fix, naming the branch after the issue (e.g. `is110`) is acceptable.)
   1. Make whatever changes are necessary, committing and Pushing to GitHub along the way.
1. In GitHub:
   1. Create a Pull Request to merge the code into `main`
   1. Link Issues that are fixed with this PR (if any). Preference is to link via the PR comments; i.e. to link the PR with Issue 130, the PR comments should include `Closes #130`.
   1. Approve the PR.
   1. Wait for all GitHub actions to complete, since source code in the main branch will be updated by these actions. (This includes the action to increment the version numbers, as discussed above.)
1. Back on the local developer machine
   1. Checkout `main` and Pull from GitHub (which will include the code modified by GitHub Actions).
   1. **Optional**: If finished with the branch, delete it locally and on GitHub with the commands listed above.

_Of course, deleting the branch in GitHub could be done from the UI instead of the command line, but since the local branch is already being deleted there anyway both can be done at once._

After this, if other branches are still active they need to have the changes from `main` merged back in.

Issues linked to the PR are automatically closed in GitHub, and there are typically filters in projects to hide closed items, so approving the PR cleans up all of the project-related workflow.
