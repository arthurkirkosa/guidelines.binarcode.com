---
title: Version Control
description: 'Version control software keeps track of every modification to the code in a special kind of database.'
position: 5
category: 'WorkFlows'
---

Since we're a small team, our git workflow doesn't have restrictions out of this world, however some common sense best
practices should be followed in order to have a clean and readable version control workflow.

## Repo naming conventions

Repositories should have descriptive names, ideally the domain they are hosted on.

<base-badge type="danger">Bad</base-badge>

`website` `frontend` `client-app`

<base-badge >Good</base-badge >

`binarcode.com` `api.binarcode.com` `binarcode-admin`


## Branch

Each project should have a protected `master` and `develop` branch. After initial project setup, each functionality,
 fix or change should be down in its own branch.

Branches should be always up to date with base branch and have no merge conflicts. Make sure your branch doesn't stay
behind more than 5 commits from the base branch.

<base-badge type="danger">Bad</base-badge>

`fix` `bug-fixes` `some-changes`

<base-badge>Good</base-badge >

`TASK-23` `feat/contact-page` `fix/route-names`

Where TASK-23 is a given JIRA Task.

#### Live Projects

Once a project goes live the `master` branch should be updated only via Pull requests from `develop` branch and
**must be stable**.

## Pull Requests

Pull Requests are essential in our workflow as they are the main source of truth to keep the people working on
the project in sync regarding the project functionality, codebase and the progress.

Each Pull Request should be reviewed by at least one person with exceptions when the reviewer is
not available and there's an urgent fix.

#### Pull Request Title

<base-badge type="danger">Bad</base-badge>
- `fixes`
- `bug-fixes`
- `task-34`
- `homepage fix`

<base-badge>Good</base-badge>
- `[TASK-23] Contact page implementation`
- `[TASK-4] Modal component`
- `Fixes & improvements for shopping cart`
- `[WIP] Navbar menu component`


#### Pull Request Description

A good PR Description is essential in avoiding questions, delays and miss-understandings.
By providing a good description, you will save time yourself for answering questions as well as reviewer's time
understanding the purpose of the PR.

Provide notes or remarks about special things that a reviewer should pay attention or things you're not 100% sure about.
Ideally a PR should contain a screenshot of the work or link to the exact page/component/set of changes that have been done.


<base-badge type="danger">Bad</base-badge>
- `Blank description`
- `Fixes`
- `Logic for auth`

<base-badge>Good</base-badge>
- `Created a new global search in the admin based on route titles and descriptions.
   This search will always be on top right on every page so it's easy to access. + screenshot`

- `Make sure there's no default API url provided in the env and PublicService.js
   This will take effect only on production after we deploy it`


#### Pull Request Size

An easy to review PR should be small in size. Keeping a PR under `+500` (with exceptions for generated files)
diffs is the best in order to avoid the reviewer missing or skipping important parts or just the PR merge being delayed.

A big PR will also cause a lot of questions and adjustments which might lead to merge conflicts, delays in merging
it and other issues. If you have a big feature, consider splitting it into multiple chunks rather than opening a huge PR.

#### Formatting

All the code in a PR should be formatted according to the editor or project formatting rules.
A badly formatted PR will be rejected as it's hard to review and understand.

#### Review Preparations

Before asking for review make sure you:
- Formatted your code well
- Removed any redundant logs, debuggers, comments, files.
- Reviewed the PR yourself to double check if you didn't skip anything
- Reviewed the PR against the Netlify link if there's one available
- The PR is up to date with base branch which means no merge conflicts
- The deploy preview (if there is one) is working or tests (if there are any) are passing
- PR is opened against correct branch.
- You've selected the reviewers for review from the right section of the PR

#### Merging

If there are many commits, prefer `Squash and Merge` option from the merge dropdown button.
Make sure to delete branch after merging.

## Commits

Commits should be descriptive. Always use present tense in commit messages.

<base-badge type="danger">Bad</base-badge>

`wip` `Fixes` `commit` `please make this work`

<base-badge>Good</base-badge>
- `[TASK-3] Update dependencies`
- `[TASK-12] Implement Modal component`
- `Fix price formatting in Checkout.vue`

## Git Tips

#### Squashing already pushed commits

Use case: You have 4 redundant commits and want to convert them to 1.
- `git reset --soft <commit> (<commit> is the hash of the start commit for squash)`
- `git commit -m "your new message"`
- `git push --force`

#### Cleaning up local branches

After a while, you'll end up with a few stale branches in your local repository.
Branches that don't exist upstream can be cleaned up with `git remote prune origin`
If you want to ensure you're not about to delete something important, add a `--dry-run` flag.

### PR Template

Create a file in the root of your app: `pull_request_template.md`

The content coult be similar like this:

```markdown
### Pull request description
<i>Description</i>

### Link to ticket or discussion
<i>Link</i>

### Type
- [ ] New feature
- [ ] Refactoring
- [ ] Bug-fix
- [ ] DevOps
- [ ] Testing
```
